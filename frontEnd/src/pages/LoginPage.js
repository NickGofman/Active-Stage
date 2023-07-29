
import {
  Card,
  Input,
  Button,
  Typography,
  CardFooter,
  CardBody,
  CardHeader,
} from '@material-tailwind/react';
import { AuthContext } from '../components/context/authContext';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCancelPassedEvents } from '../hooks/useAdminEvents';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function LoginPage() {
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');
  // State to keep track of password visibility
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // console.log('ERROR USE EFFECT:', err);
    // console.log('Use affect', currentUser);
    if (currentUser !== null) {
      currentUser?.Role === 'admin' ? navigate('/admin') : navigate('/user');
    }
  }, [currentUser, navigate]);
  const { mutate: cancelPassedEvents } = useCancelPassedEvents();
  if (currentUser !== null && currentUser?.Role === 'admin') {
    cancelPassedEvents();
  }

  //send to login function the email and password
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
    } catch (error) {
      setErr(error.response.data.error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Card className="w-96 mt-10">
        <CardHeader
          variant="gradient"
          color="light-blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Active Stage
          </Typography>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4">
            <Input
              required
              type="email"
              size="lg"
              label="Email"
              name="email"
              onChange={handleChange}
            />
            <div className="relative flex items-center">
              <Input
                required
                type={showPassword ? 'text' : 'password'} // Show the password when 
                variant="outlined"
                size="lg"
                label="Password"
                name="password"
                onChange={handleChange}
              />
              <div
                className="absolute right-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography color="red" variant="lead">
            {err && err}
          </Typography>

          <Button onClick={handleLogin} variant="gradient" fullWidth>
            Log In
          </Button>
          <Link
            to="/forgetPassword"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700 ml-2"
          >
            Forgot Password?
          </Link>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Link
              to="/register"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700 ml-2"
            >
              Register
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
