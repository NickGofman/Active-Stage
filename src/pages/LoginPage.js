// import Button from '../components/buttons/Button';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
function LoginPage() {
  return (
    <div className="container px-5 py-24 mx-auto flex flex-wrap justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4">Login</Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>

          <Button className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{' '}
            <a
              href="#"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
