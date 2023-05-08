import React from 'react';
import { Input, Textarea, Button } from '@material-tailwind/react';
import { useState } from 'react';

function MusicianProfileForm(prop) {
  const {
    bandName,
    fullName,
    email,
    experience,
    phone,
    youtubeURL,
    description,
  } = prop.user;

  // useState handle user profile Update
  const [inputs, setInputs] = useState({
    bandName: bandName,
    fullName: fullName,
    email: email,
    phone: phone,
    experience: experience,
    youtubeURL: youtubeURL,
    description: description,
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // send data to backEnd to update user profile
  const handleSubmit = () => {};
  return (
    <div className="max-w-lg w-auto md:w-full px-6 py-12 bg-white shadow-md rounded-md">
      <div className="space-y-9">
        <Input
          name="fullName"
          label="Full Name"
          id="inputOrgName"
          value={inputs.fullName}
          onChange={handleChange}
        />
        <Input
          name="bandName"
          label="Band Name"
          id="inputBandName"
          value={inputs.bandName}
          readOnly
        />
        <Input
          name="email"
          type="Email"
          label="Email"
          id="inputOrgEmail"
          value={inputs.email}
          readOnly={true}
        />
        <Input
          name="experience"
          type="number"
          label="years Of Experience"
          id="inputExp"
          onChange={handleChange}
          value={inputs.experience}
        />

        <Input
          name="phone"
          type="tel"
          label="Phone Number"
          id="inputOrgPhone"
          onChange={handleChange}
          value={inputs.phone}
        />
        <Input
          name="youtubeURL"
          type="Url"
          label="Youtube Channel"
          id="inputOrgUrl"
          onChange={handleChange}
          value={inputs.youtubeURL}
        />
        <Textarea
          name="description"
          label="Description"
          onChange={handleChange}
          value={inputs.description}
        />
        <Button onClick={handleSubmit}>Save Changes</Button>
      </div>
    </div>
  );
}

export default MusicianProfileForm;
