import { Input, Button, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../axios';
const ForgotPassword = () => {
  const [inputs, setInputs] = useState({
    email: '',
  });
  const [err, setErr] = useState(null);
  const [errMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleRegistration = (e) => {
    e.preventDefault();
    // Validate form data

    //   if (inputs === '') {

    //     return;
    //   }
    //  else if (!/\S+@\S+\.\S+/.test(inputs)) {
    //     setInputs('Invalid email format');
    //   } else {
    //     console.log('In ELSE');

    //   }
    makeRequest
      .post('/auth/forgotPassword', inputs)
      .then((response) => {
        // Handle successful registration
        console.log('Response:', response);
        setErrorMessage('');
        navigate('/');
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage(err.response.data.error);
      });
  };

  const handleChange = (e) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
    setErr({ [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" grid grid-cols-2 gap-4 w-2/3 ">
        <Typography className="mb-7" variant="lead">
          Forgot your password? No problem! Enter your email address below and
          we'll send you a new temporary password.
        </Typography>
        <form className=" flex flex-col space-y-4 w-2/2">
          <Input
            required
            size="lg"
            name="email"
            onChange={handleChange}
            error={err?.email !== ''}
            success={err?.email === ''}
            variant="outlined"
            label="Email"
            type="email"
          />
          <Button onClick={handleRegistration} fullWidth>
            Change password
          </Button>
        </form>
        <Typography className="mb-7 col-span-2" color="red" variant="small">
          Once you receive it, simply use that password to log in and create a
          new one. Don't forget to choose a strong password that's easy for you
          to remember, but difficult for others to guess. If you have any
          trouble resetting your password, please don't hesitate to contact our
          support team for assistance.
        </Typography>
        {/* <Typography color="red" variant="lead">
          {errMessage && errMessage}
        </Typography> */}
      </div>
    </div>
  );
};
export default ForgotPassword;
