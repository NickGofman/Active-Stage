import React from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from '@material-tailwind/react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
function RegisterPage() {
  return (
    <div className="container px-5 py-24 mx-auto flex flex-wrap justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4">Register</Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="First Name" />
            <Input size="lg" label="Last Name" />
            <Input size="lg" label="Email" />
            <Input
              type="password"
              variant="outlined"
              size="lg"
              label="Password"
            />
            <Input type="password" size="lg" label="Confirm Password" />
            <Input type="date" label="Birth date" datatype='' />
            <Button variant="gradient" className="flex items-center gap-3">
              <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" /> Upload
              Profile Image
            </Button>
            <Input size="lg" label="Years Of Experience" />
            <Textarea type="text" label="Description" />
          </div>
          <Button className="mt-6" fullWidth>
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
