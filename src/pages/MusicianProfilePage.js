import React from 'react';
import { Input, Textarea, Button } from '@material-tailwind/react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
function MusicianProfilePage() {
  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2   ">
        <div className="flex flex-col space-y-5  items-center">
          <img
            alt="..."
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            className="shadow-xl rounded-full h-auto align-middle border-none "
            style={{ maxWidth: '150px' }}
          />
          <Button variant="gradient" className="flex items-center gap-3">
            <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" /> Upload
            Image
          </Button>
          <Button variant="gradient" className="flex items-center gap-3">
            Change Password
          </Button>
        </div>
        <div className="max-w-lg w-full px-6 py-12 bg-white shadow-md rounded-md">
          <form className="space-y-9">
            <Input
              variant="static"
              label="Full Name"
              id="inputOrgName"
              type="text"
              placeholder="Full Name"
              required={true}
            />
            <Input
              variant="static"
              label="Band Name"
              id="inputBandName"
              type="text"
              placeholder="Email"
              value={'Sparkle Sparkle'}
              readOnly
            />
            <Input
              variant="static"
              label="years Of Experience"
              id="inputExp"
              type="number"
              placeholder="Number Of Experience "
              required={true}
            />
            <Input
              variant="static"
              label="Email"
              id="inputOrgEmail"
              type="email"
              defaultValue="muscianUser@gmail.com"
              readOnly
            />
            <Input
              variant="static"
              label="Phone Number"
              id="inputOrgPhone"
              type="tel"
              required={true}
              placeholder="Enter phone number"
            />
            <Input
              variant="static"
              label="Youtube Channel"
              id="inputOrgUrl"
              type="url"
              required={true}
              placeholder="URL"
            />
            <Textarea
              variant="static"
              label="Description"
              id="inputOrgDesc"
              type="text"
              placeholder="Enter description"
            />
            <Button>Save Changes</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MusicianProfilePage;
