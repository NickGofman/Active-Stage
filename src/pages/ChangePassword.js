import React from 'react';
import {
  Input,
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
} from '@material-tailwind/react';
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
    <div className="flex flex-col items-center justify-center h-screen ">
      <Card className="max-w-5xl">
        <CardHeader color="blue" className="text-center">
          <Typography variant="h3">Change your password</Typography>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4">
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
        </CardBody>
      </Card>
    </div>
  );
}

export default ChangePassword;
