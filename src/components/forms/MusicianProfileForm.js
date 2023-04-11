import React from 'react';
import { Input,Textarea,Button } from  '@material-tailwind/react';

function MusicianProfileForm() {
  return (
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
  );
}

export default MusicianProfileForm;
