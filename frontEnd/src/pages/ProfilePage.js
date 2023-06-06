import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import MusicianProfileForm from '../components/forms/MusicianProfileForm';
import BusinessProfileForm from '../components/forms/BusinessProfileForm ';
import { AuthContext } from '../components/context/authContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useMusicianProfileData,
  useProfilePhoto,
} from '../hooks/useMusicianProfileData';
import { useLocation } from 'react-router-dom';
import { useAdminProfileData, useGetPhoto } from '../hooks/useAdminProfileData';
function ProfilePage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = currentUser?.UserId
  const handleChangePassword = () => {
    navigate('/changepassword');
  };
  //TODO-delete this!!!
  const onSuccess = (data) => {
    console.log({ data });
  };

  const onError = (error) => {
    console.log({ error });
  };
  const isUser = currentUser.Role === 'user'
  console.log(isUser);

  //make a request for user data
  const {
    isLoading: userDataLoading,
    data: userData,
    isError: userIsError,
    error: userError,
  } = useMusicianProfileData(onError, onSuccess, userId, isUser);

  //make a request for admin data
  const {
    isLoading: adminDataLoading,
    data: adminData,
    isError: adminIsError,
    error: adminError,
  } = useAdminProfileData(onError, onSuccess, userId, isUser);
  const {
    isLoading: photoBlobLoading,
    isError: photoBlobIsError,
    error: photoBlobError,
    data: photoBlob,
  } = useProfilePhoto(userId);
  if (photoBlobLoading) {
    return <div>Loading...</div>;
  }
  if (photoBlobIsError) {
    console.log(photoBlobError);
  }
  console.log(photoBlob); // Inspect the photoBlob data

  const photoUrl = photoBlob && URL.createObjectURL(photoBlob);
  //========wait for data==============
  if (userDataLoading) {
    return <div>Loading...</div>;
  }
  if (userIsError) {
    console.log(userError);
  }
  //========wait for data==============
  if (adminDataLoading) {
    return <div>Loading...</div>;
  }

  if (adminIsError) {
    console.log(adminError);
  }
  console.log('ADMIN DATA PROFILE PAGE  ', adminData);
  console.log('user DATA PROFILE PAGE  ', userData);
  return (
    <>
      <div className="w-full flex flex-col lg:grid  lg:grid-cols-2 mt-8 px-36 py-12 ">
        <div className="flex flex-col space-y-5  items-center">
          {/* <img src={data?.url} alt={data?.name} /> */}
          <img
            src={photoUrl}
            alt="ProfilePhoto"
            className="h-64 w-64 rounded-full object-cover min-w-min"
            
          />
          <Button
            onClick={handleChangePassword}
            variant="gradient"
            className="flex items-center gap-3"
          >
            Change Password
          </Button>
        </div>
        <div className="flex flex-col  items-center">
          {currentUser?.Role === 'admin' ? (
            <BusinessProfileForm data={adminData} />
          ) : (
            <MusicianProfileForm data={userData} />
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
