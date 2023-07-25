// import Button from '../components/buttons/Button';
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
function LoginPage() {
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');

  useEffect(() => {
    // console.log('ERROR USE EFFECT:', err);
    // console.log('Use affect', currentUser);
    if (currentUser !== null) {
      currentUser?.Role === 'admin' ? navigate('/admin') : navigate('/user');
    }
  }, [currentUser, navigate]);
  const { mutate: cancelPassedEvents } =
    useCancelPassedEvents();
  if (currentUser !== null && currentUser?.Role === 'admin') {
    cancelPassedEvents();
  }

  // if (currentUser !== null) {
  //   currentUser?.role === 'admin' ? navigate('/admin') : navigate('/user');
  // }

  //send to login function the email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    // Validate form data
    // Check email

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
            <Input
              required
              type="password"
              variant="outlined"
              size="lg"
              label="Password"
              name="password"
              onChange={handleChange}
            />
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
