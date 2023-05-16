import React from 'react';
import { Input, Textarea, Button, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { makeRequest } from '../../axios';

import { FiUpload } from 'react-icons/fi';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Navigate } from 'react-router-dom';
function MusicianProfileForm(prop) {
  const [err, setErr] = useState('');

  const {
    bandName,
    firstName,
    lastName,
    email,
    photo,
    experience,
    phone,
    youtubeURL,
    description,
  } = prop.user;
  // useState handle use file
  const [file, setFile] = useState(null);
  // useState handle user profile Update
  const [inputs, setInputs] = useState({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    file: '',
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    //update profile
    if (
      !/^05\d([-]{0,1})\d{7}$/.test(inputs.phone) &&
      inputs.firstName !== '' &&
      inputs.lastName !== ''
    ) {
      setErr("Phone number ,First Name , Last name shouldn't be empty");
      return;
    } else {
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
    }
  };
  // handle file upload
  const UploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log('UploadImage OLD:', photo);
      formData.append('oldPhoto', photo);

      const res = await makeRequest.post('/upload', formData);
      
      return res.data;
    } catch (error) {
     
      setErr(error.response.data.message);
    }
    
  };
  return (
    <div className="max-w-lg w-auto md:w-full px-6 py-12 bg-white shadow-md rounded-md">
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
