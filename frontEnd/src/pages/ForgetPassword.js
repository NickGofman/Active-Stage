import { Input, Button, Typography } from '@material-tailwind/react';
const ForgetPassword = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className=" grid grid-cols-2 gap-4 w-2/3 ">
        <Typography className="mb-7" variant="lead">
          Forgot your password? No problem! Enter your email address below and
          we'll send you a new temporary password.
        </Typography>
        <form className=" flex flex-col space-y-4 w-2/2">
          <Input variant="outlined" label="Email" type="email" />
          <Button fullWidth>Change password</Button>
        </form>
        <Typography className="mb-7 col-span-2" color="red" variant="small">
          Once you receive it, simply use that password to log in and create a
          new one. Don't forget to choose a strong password that's easy for you
          to remember, but difficult for others to guess. If you have any
          trouble resetting your password, please don't hesitate to contact our
          support team for assistance.
        </Typography>
      </div>
    </div>
  );
};
export default ForgetPassword;
