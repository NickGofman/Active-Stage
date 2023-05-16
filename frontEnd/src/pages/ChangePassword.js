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
import { AuthContext } from '../components/context/authContext';
import { useContext } from 'react';
import { makeRequest } from '../axios';
import { useNavigate } from 'react-router-dom';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

function ChangePassword() {
  const { currentUser, logout } = useContext(AuthContext);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  // useState handle user profile Update
  const [inputs, setInputs] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const clickChangePassword = async (e) => {
    e.preventDefault();
    // if (
    //   inputs.newPassword !== inputs.confirmNewPassword &&
    //   inputs.newPassword === '' &&
    //   inputs.confirmNewPassword === ''&&!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(inputs.newPassword)

    // )
    if (inputs.newPassword !== inputs.confirmNewPassword) {
      setErr('Password Not match');
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(inputs.newPassword)) {
      setErr(
        'Password should contain at least 8 characters with numbers and digits'
      );
      return;
    } else {
      try {
        await makeRequest.post('/auth/changePassword', inputs, {
          withCredentials: true,
        });
        await logout();
        navigate('/', { replace: true });
      } catch (err) {
        console.error(err);
      }
    }
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
              label="New password"
              type="password"
              name="newPassword"
              required={true}
              onChange={handleChange}
            />
            <Input
              label="Confirm New password"
              type="password"
              name="confirmNewPassword"
              required={true}
              onChange={handleChange}
            />
            <Typography
              variant="small"
              color="gray"
              className="flex items-center gap-1 font-normal mt-2"
            >
              <InformationCircleIcon className="w-4 h-4 -mt-px" />
              Password should contain at least 8 characters with numbers and
              digits
            </Typography>
            <Typography color="red" variant="small">
              {err && err}
            </Typography>
            <Button onClick={clickChangePassword}>Change password</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default ChangePassword;
