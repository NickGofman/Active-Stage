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
  //state for description character count
  const [countChar, setCountChar] = useState(Description.length);
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
    if (e.target.name === 'description') {
      setCountChar(e.target.value.length);
    }
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
      inputs.lastName !== '' &&
      countChar <= 255
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
      if (countChar > 255) {
        setErr('Description must be no longer than 255 character');
      } else if (!/^05\d-\d{7}$/.test(inputs.phone)) {
        setErr('Phone number is not in the right format');
      } else if (inputs.firstName === '' || inputs.lastName === '') {
        setErr("First Name, Last Name shouldn't be empty");
      }
    }
  };

  return (
    <div className="max-w-lg w-auto md:w-full px-6 py-12 bg-white shadow-md rounded-md dark:bg-black">
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
          className="dark:text-white"
        />
        <Input
          name="lastName"
          label="Last Name"
          id="inputOrglastName"
          value={inputs.lastName}
          onChange={handleChange}
          className="dark:text-white"
        />
        <Input
          name="bandName"
          label="Band Name"
          id="inputBandName"
          value={inputs.bandName}
          readOnly
          className="dark:text-white"
        />
        <Input
          name="email"
          type="Email"
          label="Email"
          id="inputOrgEmail"
          value={inputs.email}
          readOnly={true}
          className="dark:text-white"
        />
        <Input
          name="experience"
          type="number"
          label="years Of Experience"
          id="inputExp"
          onChange={handleChange}
          value={inputs.experience}
          className="dark:text-white"
        />
        <Input
          name="phone"
          type="tel"
          label="Phone Number"
          id="inputOrgPhone"
          onChange={handleChange}
          value={inputs.phone}
          className="dark:text-white"
        />

        <Typography
          variant="small"
          color="gray"
          className="flex items-center gap-1 font-normal mt-2           dark:text-white
"
        >
          <InformationCircleIcon className="w-4 h-4 -mt-px dark:text-white" />
          Phone number format 05X-XXXXXXX
        </Typography>
        <Input
          name="youtubeURL"
          type="Url"
          label="Youtube Channel"
          id="inputOrgUrl"
          onChange={handleChange}
          value={inputs.youtubeURL}
          className="dark:text-white"
        />
        <div>
          <Textarea
            name="description"
            label="Description"
            onChange={handleChange}
            value={inputs.description}
            className="dark:text-white"
        />
          <Typography color="gray" className="text-xs">
            <span className={countChar > 255 ? 'text-red-700' : undefined}>
              {countChar}
            </span>
            <span>/255</span>
          </Typography>
        </div>
        <Input
          className="text-xs cursor-pointer dark:text-white"
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
            className="flex items-center gap-1 font-normal mt-2 dark:text-white"
          >
            <InformationCircleIcon className="w-4 h-4 -mt-px dark:text-white" />
            {err && err}
          </Typography>
        )}

        <Button onClick={handleSubmit}>Save Changes</Button>
      </form>
    </div>
  );
}

export default MusicianProfileForm;
