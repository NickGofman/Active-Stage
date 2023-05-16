import React from 'react';
import { Button } from '@material-tailwind/react';
import MusicianProfileForm from '../components/forms/MusicianProfileForm';
import BusinessProfileForm from '../components/forms/BusinessProfileForm ';
import { AuthContext } from '../components/context/authContext';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useMusicianProfileData } from '../hooks/useMusicianProfileData';
import { useLocation } from 'react-router-dom';
import { makeRequest } from '../axios';
function ProfilePage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = parseInt(useLocation().pathname.split('/')[3]);
  const handleChangePassword = () => {
    navigate('/changepassword');
  };
  // const { isLoading, error, data } = useQuery(['getProfile'], () =>
  //   makeRequest.get('/user/profile/' + userId).then((res) => {
  //     return res.data;
  //   })
  // );
 const { isLoading, data, isError, error, refetch } = useMusicianProfileData(userId);
 if(isError){
  console.log(error)
 }
 console.log(data)

  return (
    <>
      <div className="w-full flex flex-col lg:grid  lg:grid-cols-2 mt-8 px-36 py-12 ">
        <div className="flex flex-col space-y-5  items-center">
          <img
            alt="..."
            src={"../../../backEnd/UploadImages/"+data.Photo}
            className="shadow-xl rounded-full h-auto align-middle border-none "
            style={{ maxWidth: '150px' }}
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
          {currentUser?.role === 'admin' ? (
            <BusinessProfileForm admin={{}} />
          ) : (
            <MusicianProfileForm user={data} />
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
