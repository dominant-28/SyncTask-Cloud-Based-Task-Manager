import User from "../modals/user.js";
import { createJWT } from "../utils/index.js";
import  Notice from "../modals/notification.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title,faceData } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin:role=='user'?false:true,
      role,
      title,
      faceData:faceData || null,
      useFaceLogin: faceData?true :false
    });

    if (user) {
      isAdmin ? createJWT(res, user._id) : null;
      user.password = undefined;
      user.faceData=null;
      res.status(201).json(user);
    } else {
      return res.status(400).json({
        status: false,
        message: "Invalid user data",
      });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }

    if (!user?.isActive) {
      return res.status(401).json({
        status: false,
        message: "User account has been deactivated,contact the administrator",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (user && isMatch) {
      createJWT(res, user._id);
      user.password = undefined;
      user.faceData=null;
      res.status(200).json(user);
    } else {
      return res
        .status(401)
        .json({ status: false, message: "invalid email or password" });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful " });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTeamList = async (req, res) => {
  try {
    const users =await User.find().select("name title role email isActive ")
    res.status(200).json(users)
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};


export const getNotificationsList = async (req, res) => {
    try {
      const {userId}=req.user
      const notice =await Notice.find({
        team:userId,
        isRead:{$nin:[userId]},

      }).populate("task","title")

      res.status(201).json(notice)
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  };


  export const updateUserProfile = async (req, res) => {
    try {
      const {userId,isAdmin}=req.user
      const {_id}=req.body
      const id=isAdmin && userId===_id ? userId:isAdmin &&userId!==_id ? _id:userId 
      const user=await User.findById(id)

      if(user){
        user.name=req.body.name|| user.name
        user.title=req.body.title|| user.title
        user.role=req.body.role|| user.role
        const updatedUser=await user.save()
        user.password=undefined

        res.status(201).json({
            status:true,
            message:"Profile Updated Sucessfully",
            user:updatedUser
        })

      }
      else{
         res.status(404).json({ status: false, message: "User Not Found" });
      }
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  };
  export const markNotificationRead = async (req, res) => {
    try {
       const {userId}=req.user
       const {isReadType,id }=req.query
       if(isReadType=="all"){
        await Notice.updateMany(
          {team:userId,isRead:{$nin: [userId]}},
          {$push:{isRead:userId}},
          {new:true}
        )   }
        else{
          await Notice.findOneAndUpdate(
            {
            _id:id, isRead:{$nin:[userId]}
          },
          {$push:{isRead: userId}},
          {
            new:true
          }
        )
        }
       }
     catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  };
  export const changeUserpassword = async (req, res) => {
    try {
      const {userId}=req.user
      const user=await User.findById(userId)

      if(user){
        user.password=req.body.password

        await user.save();
        user.password=undefined
        res.status(201).json({
          status:true,
          message: "Password changed sucessfully"
        })
      }
      else{
        res.status(404).json({status:false,message:"User not found"})
      }
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  };
  
  export const activateUserProfile = async (req, res) => {
    try {
      const {id}=req.params
      const user=await User.findById(id)

      if(user){
        user.isActive=req.body.isActive
        await user.save()
        res.status(201).json({
          status:true,
          message:`User account has been ${user?.isActive ? "activated" :"disabled"}`
        })
      }
      else{
        res.status(404).json({status:false,message:"User not found"})
      }
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  };

  export const deleteUserProfile = async (req, res) => {
    try {
      const {id}=req.params
      await User.findByIdAndDelete(id)
      res.status(200).json({status:true,message:"User deleted successfully"})
      
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  };

  
  
  export const faceLogin = async (req, res) => {
    try {
      const { email, faceData } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // Check if user has face login enabled
      if (!user.useFaceLogin) {
        return res.status(400).json({ message: 'Face login not enabled for this user' });
      }
  
      // Check if face matches
      const isMatch = user.matchFace(faceData);
      
      if (isMatch) {
        createJWT(res, user._id);
      user.password = undefined;
      user.faceData=null;
      res.status(200).json(user);
      } else {
        res.status(401).json({ message: 'Face verification failed' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  export const updateFaceData = async (req, res) => {
    try {
      const { faceData } = req.body;
      const userId = req.user._id; // From auth middleware
  
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.faceData = faceData;
      user.useFaceLogin = true;
      await user.save();
  
      res.json({ message: 'Face data updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };