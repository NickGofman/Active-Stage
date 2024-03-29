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
import { useNavigate } from 'react-router-dom';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useChangePassword } from '../hooks/useAuth';

function ChangePassword() {
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  // Mutation hook for changing the password
  const mut = useChangePassword();

  // State to handle user inputs for the new password and confirmation
  const [inputs, setInputs] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  // Handler to update the inputs state when user types in the input fields
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handler for the "Change password" button click
  const clickChangePassword = async (e) => {
    e.preventDefault();
    // Check if the new password matches the confirmation
    if (inputs.newPassword !== inputs.confirmNewPassword) {
      setErr('Password Not match');
      return;
    }
    // Check if the new password meets the required format
    if (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(inputs.newPassword)) {
      setErr(
        'Password should contain at least 8 characters with numbers and digits'
      );
      return;
    } else {
      try {
        // Call the mutation function to change the password
        await mut.mutateAsync(inputs);
        navigate('/', { replace: true });
        setErr('Password was Changed');
      } catch (error) {
        setErr(error.response.data.error);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-black ">
      <Card className="max-w-5xl dark:bg-black ">
        <CardHeader color="blue" className="text-center dark:bg-black ">
          <Typography variant="h3">Change your password</Typography>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4">
            <Input
              label="New password"
              type="password"
              name="newPassword"
              required={true}
              onChange={handleChange}
              error={!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(inputs.newPassword)}
              success={/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(inputs.newPassword)}
              className="dark:text-white"
            />
            <Input
              label="Confirm New password"
              type="password"
              name="confirmNewPassword"
              required={true}
              onChange={handleChange}
              error={!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(inputs.newPassword)}
              success={
                inputs.newPassword === inputs.confirmNewPassword &&
                inputs.confirmNewPassword !== ''
              }
              className="dark:text-white"
            />
            <Typography
              variant="small"
              color="gray"
              className="flex items-center gap-1 font-normal mt-2 dark:text-white"
            >
              <InformationCircleIcon className="w-4 h-4 -mt-px dark:text-white" />
              Password should contain at least 8 characters with numbers and
              digits
            </Typography>
            <Typography color="red" variant="small">
              {err && err}
            </Typography>
            <Button color="blue-gray" onClick={clickChangePassword}>
              Change password
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default ChangePassword;
