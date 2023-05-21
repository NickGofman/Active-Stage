import React from 'react';
import { Input, Textarea, Button, Typography } from '@material-tailwind/react';

import { useState } from 'react';
import { makeRequest } from '../../axios';
import { FiUpload } from 'react-icons/fi';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
function MusicianProfileForm(props) {
  const [err, setErr] = useState('');

  const {
    Description,
    FirstName,
    LastName,
    PhoneNumber,
    YearsOfExperience,
    URL,
    Photo,
    Email,
    BandName,
  } = props?.data?.data[0];
  // useState handle use file
  const [file, setFile] = useState(null);
  // useState handle user profile Update
  const [inputs, setInputs] = useState({
    firstName: FirstName,
    lastName: LastName,
    phone: PhoneNumber,
    file: Photo,
    experience: YearsOfExperience,
    youtubeURL: URL,
    description: Description,
    email: Email,
    bandName: BandName,
  });

  console.log('INPUSTS:', inputs);
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // send data to backEnd to update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    //update profile
    if (
      /^05\d([-]{0,1})\d{7}$/.test(inputs.phone) &&
      inputs.firstName !== '' &&
      inputs.lastName !== ''
    ) {
      //upload to backend localStorage
      if (file) {
        let imgURL = '';
        //upload image
        imgURL = await UploadImage();
        inputs.file = imgURL;
      }
      //send data to database
      await makeRequest.post('/user/updateProfile', inputs, {
        withCredentials: true,
      });
      setErr('');
    } else {
      setErr("Phone number ,First Name , Last name shouldn't be empty");
      return;
    }
  };
  // handle file upload
  const UploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log('UploadImage OLD:', Photo);
      formData.append('oldPhoto', Photo);
      const res = await makeRequest.post('/upload', formData);
      setErr('');
      return res.data;
    } catch (error) {
      setErr(error.response.data.message);
    }
  };
  return (
    <div className="max-w-lg w-auto md:w-full px-6 py-12 bg-white shadow-md rounded-md">
      <Typography color='blue' className='mb-2' variant='h5'>Here You Can Edit Your Profile</Typography>
      <form method="post" className="space-y-6">
        <Input
          name="firstName"
          label="First Name"
          id="inputOrgName"
          value={inputs.firstName}
          onChange={handleChange}
        />
        <Input
          name="lastName"
          label="Last Name"
          id="inputOrgName"
          value={inputs.lastName}
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

        <Typography
          variant="small"
          color="gray"
          className="flex items-center gap-1 font-normal mt-2"
        >
          <InformationCircleIcon className="w-4 h-4 -mt-px" />
          Phone number format 05X-XXXXXXX
        </Typography>
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
        <Input
          className="text-xs cursor-pointer"
          name="file"
          type="file"
          label="Upload Image"
          icon={<FiUpload />}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Typography
          variant="small"
          color="gray"
          className="flex items-center gap-1 font-normal mt-2"
        >
          <InformationCircleIcon className="w-4 h-4 -mt-px" />
          {err && err}
        </Typography>

        <Button onClick={handleSubmit}>Save Changes</Button>
      </form>
    </div>
  );
}

export default MusicianProfileForm;
