import React from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';
import { useState } from 'react';

function ChangePassword() {
  // useState handle user profile Update
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    newPassword: '',
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <form className=" space-y-9 mx-auto max-w-lg lg:w-3/4">
      <Typography variant="h2">Change Your Password</Typography>
      <Input
        label="Email"
        type="email"
        required={true}
        onChange={handleChange}
      />
      <Input
        label="New password"
        type="password"
        required={true}
        onChange={handleChange}
      />
      <Input
        label="Confirm New password"
        type="password"
        required={true}
        onChange={handleChange}
      />
      <Button>Change password</Button>
    </form>
  );
}

export default ChangePassword;
