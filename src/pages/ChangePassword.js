import React from 'react';
import { Input,  Button, Typography } from '@material-tailwind/react';

function ChangePassword() {
  return (
    <form className=" space-y-9 mx-auto max-w-lg lg:w-3/4">
      <Typography variant="h2">Change Your Password</Typography>
      <Input
        variant="static"
        label="Email"
        type="email"
        placeholder="Email"
        required={true}
      />
      <Input
        variant="static"
        label="New password"
        type="password"
        placeholder="New password"
        required={true}
      />
      <Input
        variant="static"
        label="Confirm New password"
        type="password"
        placeholder="Confirm New password"
        required={true}
      />

      <Button>Change password</Button>
    </form>
  );
}

export default ChangePassword;
