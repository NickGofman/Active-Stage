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
import { useContext } from 'react';
import { Link } from 'react-router-dom';
function LoginPage() {
  const { login } = useContext(AuthContext);
  const handleLogin = () => {
    login();
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {/* <Card color="transparent" shadow={false}>
        <Typography variant="h4">Login</Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>

          <Button onClick={handleLogin} className="mt-6" fullWidth>
            Login
          </Button>
          <Link
            to="/forgetpassword"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700 ml-2"
          >
            Forgot Password?
          </Link>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?
            <Link
              to="/register"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700 ml-2"
            >
              Register
            </Link>
          </Typography>
        </form>
      </Card> */}
      <Typography variant="h3">
        Welcome to Active Stage
      </Typography>
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
          <Button variant="gradient" fullWidth>
            Sign In
          </Button>
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
