import React, { useEffect, useState ,useRef} from 'react'
// Removed redundant import: import { use } from 'react';
import { useLoginMutation, useRegisterMutation, useFaceLoginMutation } from '../redux/slices/api/authApSlice';
import Button from '../components/Button';
import { useForm } from 'react-hook-form'
import Textbox from '../components/Textbox';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '../redux/slices/authSlice';
import { toast } from 'sonner';
import FaceCapture from '../components/FaceCapture';

export default function Login() {
  const { user } = useSelector((state) => state.auth)
  const [isRegister, setIsRegister] = useState(false);
  const [faceData, setFaceData] = useState(null);
  const [useFaceLogin, setUseFaceLogin] = useState(false);
  const [showFaceCapture, setShowFaceCapture] = useState(false);
  const [faceLoginEmail, setFaceLoginEmail] = useState('');
  const faceLoginEmailRef = useRef('');
  useEffect(() => {
    faceLoginEmailRef.current = faceLoginEmail;
  }, [faceLoginEmail]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading: isLoginLoading }] = useLoginMutation()
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation()
  const [faceLogin, { isLoading: isFaceLoginLoading }] = useFaceLoginMutation();
  
  const handleFaceCapture = async(descriptor) => {
   
    if(isRegister){
      setFaceData(descriptor);
      toast.success('Face captured successfully!');
      setShowFaceCapture(false);
    }
    else{
      
      
      if (!faceLoginEmail) {
        toast.error('Please enter your email address first');
        setShowFaceCapture(false);
        return;
      }
     
      try {
        const result = await faceLogin({
          email: faceLoginEmail,
          faceData: descriptor
        }).unwrap();
        console.log(result)
        dispatch(setCredentials(result));
        toast.success('Face login successful!');
        navigate('/');
      } catch (error) {
        toast.error(error?.data?.message || 'Face verification failed');
        setShowFaceCapture(false);
      }
    }
  };
  const startFaceRecognition = () => {
    console.log(faceLoginEmail)
    // Validate email before showing face capture
    if (!faceLoginEmail || !faceLoginEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setShowFaceCapture(true);
  };

  const submithandler = async (data) => {
    try{
      
      if(isRegister){
        const userData = {
          ...data,
          faceData: useFaceLogin ? faceData : null,
        };
        if (useFaceLogin && !faceData) {
          return toast.error('Please capture your face before registering');
        }
        const result = await registerUser(userData).unwrap();
        toast.success('Registered successfully! Please log in.');
        setIsRegister(false);
      }
      else{
        const result = await login(data).unwrap()
        dispatch(setCredentials(result))
        navigate('/')
      }
    } catch(error){
      toast.error(error?.data?.message || error.message)
    }
  }
  
  useEffect(() => { 
    user && navigate('/dashboard')
  }, [user])
  
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row loginpage'>
      <div className='w-full md:w-auto flex md:gap-40 gap-0 flex-col md:flex-row items-center justify-center'>
      <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
  <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
    <span className='flex gap-1 py-1 px-3 border rounded-full text-cyan-200 text-sn md:text-base border-cyan-700'>
      Seamless Collaboration, Effortless Task Management!
    </span>
    <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-cyan-200'>
      <span>Cloud-Based</span>
      <span>Task Manager</span>
    </p>
    
    <div className='relative group cell'>
      {/* Glowing Background */}
      <div className='absolute top-[29%] left-[28%] w-32 h-32 rounded-full bg-cyan-300 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

    
      {/* Logo Image */}
      <img src="logo.png" alt="SyncTask Logo" className='relative' />
    </div>

    <span className='text-teal-100 text-xl font-bold'>
      Sign Up & Simplify Your Task Management!
    </span>
  </div>
</div>


        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          {(useFaceLogin&& !isRegister) ? (
            <div className="glow form-container w-full md:w-[400px] flex flex-col gap-y-8 loginpage px-10 pt-4 pb-14">
              <div>
                <p className="text-teal-200 text-3xl font-bold text-center">
                  Face Login
                </p>
                <p className="text-center text-base text-teal-200">
                  Login with facial recognition
                </p>
              </div>

              <div className="flex flex-col gap-y-5">
                <Textbox
                  placeholder="email@example.com"
                  type="email"
                  name="faceLoginEmail"
                  label="Your Email"
                  classname="w-full rounded-full"
                  value={faceLoginEmail}
                  onChange={(e) => setFaceLoginEmail(e.target.value)}
                  error=""
                />

                {showFaceCapture ? (
                  <div className="flex flex-col gap-4">
                    <FaceCapture onCapture={handleFaceCapture} />
                    <Button
                      type="button"
                      label="Cancel"
                      onClick={() => setShowFaceCapture(false)}
                      className="w-full h-10 bg-gray-500 text-white font-bold rounded-full"
                    />
                  </div>
                ) : (
                  <Button
                    type="button"
                    label="Start Face Recognition"
                    onClick={startFaceRecognition}
                    className="w-full h-10 bg-teal-300 text-blue-950 font-bold rounded-full"
                    disabled={isFaceLoginLoading}
                  />
                )}

                {isFaceLoginLoading && <Loading />}

                <p
                  className="text-sm text-gray-100 cursor-pointer text-center"
                  onClick={() => setUseFaceLogin(false)}
                >
                  Use password instead
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(submithandler)} className='glow form-container w-full md:w-[400px] flex flex-col gap-y-8 loginpage px-10 pt-4 pb-14'>
              <div>
                <p className='text-teal-200 text-3xl font-bold text-center'>
                  {isRegister ? 'Create an Account' : "Welcome back!"}
                </p>
                <p className='text-center text-base text-teal-200'>
                  {isRegister ? 'Register to manage your tasks.' : 'Keep all your credentials safe.'}
                </p>
              </div>
              
              <div className='flex flex-col gap-y-5'>
                {isRegister && (
                  <>
                    <Textbox
                      placeholder='Your Name'
                      type='text'
                      name='name'
                      label='Full Name'
                      classname="w-full rounded-full"
                      register={register('name', { required: 'Name is required' })}
                      error={errors.name?.message}
                    />
                    <div className='flex gap-5'>
                      <Textbox
                        placeholder='Your Title'
                        type='text'
                        name='title'
                        label='Title'
                        classname="w-full rounded-full"
                        register={register('title', { required: 'Title is required' })}
                        error={errors.title?.message}
                      />
                      
                      <div className='flex flex-col gap-2'>
                        <label className='text-teal-200' htmlFor='role'>Login As</label>
                        <select
                          id='role'
                          {...register('role', { required: 'Role is required' })}
                          className='w-20 p-2  bg-[#1E2738] rounded-full  text-gray-500 border border-teal-700'
                        >
                          <option value='user'>User</option>
                          <option value='admin'>Admin</option>
                        </select>
                        {errors.role && <p className='text-red-500 text-sm'>{errors.role.message}</p>}
                      </div>
                    </div>
                  </>
                )}
                
                <Textbox
                  placeholder='email@example.com'
                  type="email"
                  name='email'
                  label='Email Address'
                  classname="w-full rounded-full"
                  register={register('email', { required: "Email address is required" })}
                  error={errors.email ? errors.email.message : ""}
                />
                
                <Textbox
                  placeholder='Your password'
                  type="password"
                  name='password'
                  label='Password'
                  classname="w-full rounded-full"
                  register={register('password', { required: "Password is required" })}
                  error={errors.password ? errors.password.message : ""}
                />
                
                {isRegister && (
                  <>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="useFaceLogin"
                        checked={useFaceLogin}
                        onChange={() => setUseFaceLogin(!useFaceLogin)}
                        className="h-4 w-4"
                      />
                      <label htmlFor="useFaceLogin" className="text-teal-200">
                        Enable face recognition login
                      </label>
                    </div>

                    {useFaceLogin && (
                      <div className="mt-2">
                        {showFaceCapture ? (
                          <FaceCapture onCapture={handleFaceCapture} />
                        ) : (
                          <div className="flex flex-col gap-2">
                            {faceData ? (
                              <div className="flex items-center gap-2">
                                <span className="text-green-400">✓ Face captured</span>
                                <button
                                  type="button"
                                  onClick={() => setShowFaceCapture(true)}
                                  className="text-sm text-teal-300 underline"
                                >
                                  Recapture
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setShowFaceCapture(true)}
                                className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
                              >
                                Capture Face
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                
                {!isRegister && (
                  <span className='text-sm text-gray-100 hover:text-teal-300 hover:underline cursor-pointer'>
                    Forget Password?
                  </span>
                )}
                
                {isRegisterLoading || isLoginLoading ? (
                  <Loading />
                ) : (
                  <Button 
                    type='submit' 
                    label={isRegister ? 'Register' : 'Login'} 
                    className='w-full h-10 bg-teal-300 text-blue-950 font-bold rounded-full' 
                  />
                )}
                
                {!isRegister && (
                  <p
                    className="text-sm text-gray-100 cursor-pointer text-center"
                    onClick={() => setUseFaceLogin(true)}
                  >
                    Login with Face Recognition
                  </p>
                )}
              </div>
              
              <p className='text-sm text-gray-100 cursor-pointer text-center' onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Already have an account? Log in' : 'New here? Register now'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

