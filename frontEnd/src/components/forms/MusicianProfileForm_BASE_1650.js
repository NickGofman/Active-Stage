import React, { useContext, useEffect } from 'react';
import { Input, Textarea, Button, Typography } from '@material-tailwind/react';

import { useState } from 'react';
import { makeRequest } from '../../axios';
import { FiUpload } from 'react-icons/fi';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useUpdateMusicianProfile } from '../../hooks/useMusicianProfileData';
import { AuthContext } from '../context/authContext';
function MusicianProfileForm(props) {
  const { updateLocalStoragePhoto } = useContext(AuthContext);
  const [err, setErr] = useState('');
  const mut = useUpdateMusicianProfile();
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
    firstName: '',
    lastName: '',
    phone: '',
    file: file,
    experience: '',
    youtubeURL: '',
    description: '',
    email: '',
    bandName: '',
  });
  useEffect(() => {
    setInputs({
      firstName: FirstName || '',
      lastName: LastName || '',
      phone: PhoneNumber || '',
      file: Photo || null,
      experience: YearsOfExperience || '',
      youtubeURL: URL || '',
      description: Description || '',
      email: Email || '',
      bandName: BandName || '',
    });
  }, [props?.data?.data[0]]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // handle file upload
  const UploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('oldPhoto', Photo);
      const res = await makeRequest.post('/upload', formData);
      setErr(''); // Clear any previous error messages
      return res.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned an error message, display it
        throw new Error(error.response.data.message);
      } else {
        // Otherwise, throw a generic error message
        throw new Error('An error occurred while uploading the image.');
      }
    }
  };

  // send data to backEnd to update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    //update profile
    if (
      /^05\d-\d{7}$/.test(inputs.phone) &&
      inputs.firstName !== '' &&
      inputs.lastName !== ''
    ) {
      //upload to backend localStorage
      let isValidImage = true;
      if (file) {
        try {
          const imgURL = await UploadImage();
          inputs.file = imgURL;
          updateLocalStoragePhoto(imgURL);
        } catch (error) {
          // Handle image size error
          isValidImage = false;
          setErr(error.message);
        }
      }

      console.log('isValidImage', isValidImage);
      if (isValidImage) {
        try {
          await mut.mutateAsync(inputs);
          setErr('Update Successfully');
        } catch (error) {
          // Handle other mutation errors if needed
          return;
        }
      }
    } else {
      if (!/^05\d-\d{7}$/.test(inputs.phone)) {
        setErr('Phone number is not in the right format');
      } else {
        setErr("First Name, Last Name shouldn't be empty");
      }
    }
  };

  return (
    <div className="max-w-lg w-auto md:w-full px-6 py-12 bg-white shadow-md rounded-md">
      <Typography color="blue" className="mb-2" variant="h5">
        Here You Can Edit Your Profile
      </Typography>

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
          id="inputOrglastName"
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
        {err && (
          <Typography
            variant="small"
            color="red"
            className="flex items-center gap-1 font-normal mt-2"
          >
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {err && err}
          </Typography>
        )}

        <Button onClick={handleSubmit}>Save Changes</Button>
      </form>
    </div>
  );
}

export default MusicianProfileForm;
