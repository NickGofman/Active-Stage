import { Input, Button, Typography } from '@material-tailwind/react';
const ForgetPassword = () => {
  return (
    <>
      <Typography variant="h2">Change Your Password</Typography>
      <form className=" flex flex-col space-y-2 lg:space-y-0 lg:space-x-2 mx-auto max-w-2xl lg:flex-row">
        <Input variant="outlined" label="Email" type="email" required={true} />
        <Button fullWidth>Change password</Button>
      </form>
    </>
  );
};
export default ForgetPassword;
