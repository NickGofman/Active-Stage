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
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function LoginPage() {
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Use affect",currentUser);
    if (currentUser !== null) {
      currentUser?.role === 'admin' ? navigate('/admin') : navigate('/user');
    }
  }, [currentUser, navigate]);
  const handleLogin = () => {
    login();
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Typography variant="h3">Welcome to Active Stage</Typography>
      <Card className="w-96 mt-10">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4">
            <Input label="Email" size="lg" />
            <Input label="Password" size="lg" />
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={handleLogin} variant="gradient" fullWidth>
            Sign In
          </Button>
          <Link
            to="/forgetpassword"
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
