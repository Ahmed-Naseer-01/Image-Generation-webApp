import React from 'react';
import RegistrationForm from './component/authetication/RegistrationForm';
import LoginForm from './component/authetication/LoginForm';
import LogoutForm from './component/authetication/LogoutForm';
import Profile from './component/authetication/Profile';
import ChangePasswordForm from './component/authetication/ChangePasswordForm';
import SendPasswordResetEmailForm from './component/authetication/SendPasswordResetEmailForm';
import ResetPasswordForm from './component/authetication/ResetPasswordForm';
import GenerateImageForm from './component/Image_Generation/GenerateImageForm';
import GeneratedImageList from './component/Image_Generation/GeneratedImageList';


function App() {
  return (
    <div>
      <h1>User Registration</h1>
      <RegistrationForm />

      <h1>User Login</h1>
      <LoginForm />
      <h1>User Logout</h1>
      <LogoutForm />
      <h1>User Profile</h1>
      <Profile />

       <h1>Change Password</h1>
        <ChangePasswordForm /> 

      <h1>Send Password Reset Email</h1>
      <SendPasswordResetEmailForm />

      {/* This part would come from the password reset link */}
      <h1>Reset Password</h1>
      <ResetPasswordForm uid="..." token="..." />

        {/* Text to Image Generation */}
            <h1>Text to Image Generation</h1>
      <GenerateImageForm />
      <GeneratedImageList />
    </div>
  );
}
export default App;