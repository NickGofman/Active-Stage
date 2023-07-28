import { Input, Button, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForgotPassword } from '../hooks/useAuth';
const ForgotPassword = () => {
  const [inputs, setInputs] = useState({
    email: '',
  });
  //TODO- we need to delete this state? (err)
  const [err, setErr] = useState(null);
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();
  const mut = useForgotPassword();
  const handleRegistration = async (e) => {
    e.preventDefault();
    // Validate form data
    if (inputs.email !== '') {
      const emailRegex = /^\S+@\S+\.\S+[a-zA-Z0-9]$/; // Regular expression to check email format
      if (!emailRegex.test(inputs.email)) {
        setErrMessage(
          'Invalid email format. Please enter a valid email address.'
        );
      } else {
        try {
          await mut.mutateAsync(inputs);
          setErrMessage('Check Your Mail Box');
        } catch (error) {
          setErrMessage(error.response.data.error);
        }
      }
    } else {
      setErrMessage('You must enter your Email');
    }
  };
  const handleBackToLogin = () => {
    navigate('/');
  };
  const handleChange = (e) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
    setErr({ [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen ">
      <div className="lg:grid  w-2/3 ">
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
            variant="outlined"
            label="Email"
            type="email"
          />
          <Typography color="red" variant="lead">
            {errMessage && errMessage}
          </Typography>
          <Button onClick={handleRegistration} fullWidth>
            Change password
          </Button>
        </form>
        <Typography className=" mt-4 mb-7 col-span-2" variant="small">
          Once you receive it, simply use that password to log in and create a
          new one. Don't forget to choose a strong password that's easy for you
          to remember, but difficult for others to guess. If you have any
          trouble resetting your password, please don't hesitate to contact our
          support team for assistance.
          <Button size="sm" color="amber" onClick={handleBackToLogin}>
            Go To Login
          </Button>
        </Typography>
      </div>
    </div>
  );
};
export default ForgotPassword;
