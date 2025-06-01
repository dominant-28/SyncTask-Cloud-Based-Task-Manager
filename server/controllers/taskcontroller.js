import Task from "../modals/task.js";
import Notice from "../modals/notification.js";
import User from "../modals/user.js";

export const createTask = async (req, res) => {
  try {
    const { title, team, stage, date, priority, assets } = req.body;

    const task = await Task.create({
      title,
      team,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
      assets,
      TeamAdmin: req.user.userId, 
    });
    await User.updateMany(
      { _id: { $in: team } }, // Find users in team
      { $addToSet: { task: task._id } } // Add task ID only if it's not already present
    );
    
    let text = "New task has been assigned to you ";
    if (task.team.length > 1) {
      text = text + `and ${task.team.length - 1} others. `;
    }
    text =
      text +
      `The task priority is set a ${
        task.priority
      } priority ,so check and act accordingly.The task date is ${task.date.toDateString()} .
        Thank you!!!`;
    await Notice.create({
      team,
      text,
      task: task._id,
    });
    res.status(200).json({
      status: true,
      message: "Task created successfully",
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const duplicateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    const newtask = await Task.create({
      ...task,
      title: task.title + "-duplicate",
    });
    newtask.team = task.team;
    newtask.assets = task.subTask;
    newtask.priority = task.priority;
    newtask.stage = task.stage;
    await newtask.save();

    let text = "New task has been assigned to you";
    if (task.team.length > 1) {
      text = text + `and ${task.team.length - 1} others`;
    }
    text =
      text +
      `The task priority is set a ${
        task.priority
      } priority ,so check and act accordingly.The task date is ${task.date.toDateString()} .
        Thank you!!!`;
    await Notice.create({
      team: task.team,
      text,
      task: newtask._id,
    });
    res.status(200).json({
      status: true,
      message: "Task duplicated successfully",
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const postTaskActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { type, activity } = req.body;

    const task = await Task.findById(id);

    const data = {
      type,
      activity,
      by: userId,
      date: new Date(),
    };

    task.activities.push(data);

    await task.save();
    return res.status(201).json({
      status: true,
      message: "Activity added successfully",
      activity: data,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const dashboardStatistics = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;

    let alltasks = [];
    let teamUsers = [];

    if (isAdmin) {
      // ✅ Admin: Get tasks involving their teamMembers
      const currentUser = await User.findById(userId).select("teamMembers");
      const teamMemberIds = currentUser.teamMembers.map((id) => id.toString());

      // Get all tasks where any of these teamMembers are part of the team
      alltasks = await Task.find({
        isTrashed: false,
        TeamAdmin: userId,
      })
        .populate({ path: "team", select: "name role title email" })
        .sort({ _id: -1 });

      // ✅ Just fetch the users directly from teamMembers
      teamUsers = await User.find({
        _id: { $in: teamMemberIds },
      })
        .select("name title role email isAdmin createdAt")
        .limit(10)
        .sort({ _id: -1 });

    } else {
      // ✅ Normal user: get only tasks where they are in the team
      alltasks = await Task.find({
        isTrashed: false,
        team: userId,
      })
        .populate({ path: "team", select: "name role title email" })
        .sort({ _id: -1 });

      // Extract teammates from those tasks (excluding the user themself)
      const teammateIds = new Set();
      alltasks.forEach((task) => {
        task.team.forEach((member) => {
          if (member._id.toString() !== userId) {
            teammateIds.add(member._id.toString());
          }
        });
      });

      teamUsers = await User.find({
        _id: { $in: Array.from(teammateIds) },
      })
        .select("name title role email isAdmin createdAt")
        .limit(10)
        .sort({ _id: -1 });
    }

    // 📊 Grouping by stage
    const groupTasks = alltasks.reduce((result, task) => {
      const stage = task.stage;
      result[stage] = (result[stage] || 0) + 1;
      return result;
    }, {});

    // 📊 Grouping by priority
    const groupData = Object.entries(
      alltasks.reduce((result, task) => {
        const { priority } = task;
        result[priority] = (result[priority] || 0) + 1;
        return result;
      }, {})
    ).map(([name, total]) => ({ name, total }));

    const totalTasks = alltasks.length;
    const last10Task = alltasks.slice(0, 10);

    const summary = {
      alltasks,
      totalTasks,
      last10Task,
      users: teamUsers, // ✅ Always based on teamMembers for admin
      tasks: groupTasks,
      groupData,
    };

    res.status(200).json({ status: true, ...summary, message: "Success" });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const userid = req.user.userId;
    const isAdmin = req.user.isAdmin;

    const { stage, isTrashed, search } = req.query;

    // Build base query
    let query = {
      isTrashed: isTrashed === "true", // default false
    };

    // Filter by role
    if (isAdmin) {
      query.TeamAdmin = userid;
    } else {
      query.team = { $all: [userid] };
    }

    // Optional filters
    if (stage) {
      query.stage = stage;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    
    const tasks = await Task.find(query)
      .populate({
        path: "team",
        select: "name title email",
      })
      .sort({ _id: -1 });
  
    res.status(200).json({ status: true, tasks });

  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id)
      .populate({
        path: "team",
        select: "name title role email ",
      })
      .populate({ path: "activities.by", select: "name" })
      .sort({ _id: -1 });

    res.status(200).json({ status: true, task });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const createSubTask = async (req, res) => {
  try {
    const { title, tag, data } = req.body;

    const { id } = req.params;

    const newsubTask = {
      title,
      data,
      tag,
    };
    const task = await Task.findById(id);
    task.subTask.push(newsubTask);
    await task.save();
    res
      .status(200)
      .json({ status: true, message: "subTask added successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, team, stage, priority, assets } = req.body;
    const task = await Task.findById(id);
    task.title = title;
    task.assets = assets;
    task.priority = priority.toLowerCase();
    task.date = date;
    task.team = team;
    task.stage = stage.toLowerCase();

    await task.save();
    await User.updateMany(
      { _id: { $in: team } }, // Find users in team
      { $addToSet: { task: id } } // Add task ID only if it's not already present
    );
    res
      .status(200)
      .json({ status: true, message: "Task is updated successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const updateTaskAssets = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const task = await Task.findById(id);
    const updatedAssets = data.assets;
    task.assets = updatedAssets;

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Task is updated successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const trashTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.isTrashed = true;
    await task.save();
    res
      .status(200)
      .json({ status: true, message: "Task is trashed successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const deleteRestoreTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { actionType } = req.query;
    if (actionType === "delete") {
      await Task.findByIdAndDelete(id);
      res
        .status(200)
        .json({ status: true, message: "Task is deleted successfully." });
    } else if (actionType === "deleteAll") {
      await Task.deleteMany({ isTrashed: true });
      res
        .status(200)
        .json({
          status: true,
          message: "All trashed task is deleted successfully.",
        });
    } else if (actionType === "restore") {
      const task = await Task.findById(id);
      task.isTrashed = false;
      await task.save();
    } else if (actionType === "restoreAll") {
      await Task.updateMany(
        { isTrashed: true },
        { $set: { isTrashed: false } }
      );
    }
    res
      .status(200)
      .json({ status: true, message: "Operations performed successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
