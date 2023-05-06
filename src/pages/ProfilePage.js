import React from 'react';
import { Button } from '@material-tailwind/react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import MusicianProfileForm from '../components/forms/MusicianProfileForm';
import BusinessProfileForm from '../components/forms/BusinessProfileForm ';
import { AuthContext } from '../components/context/authContext';
import { useContext } from 'react';
function ProfilePage() {
  const { currentUser } = useContext(AuthContext);
  const admin = {
    businessName: 'Sparkle Sparkle',
    address: 'Derekh Yafo 35 Haifa Israel',
    phone: '054-315-5555',
    managerName: 'Alex',
    role: 'Admin',
  };
  const user = {
    bandName: 'Sparkle Sparkle',
    fullName: 'Sparkle Sofimarat',
    email: 'user@gmail.com',
    experience: 5,
    youtubeURL: 'www.youtube.com/CollBand',
    phone: '054-315-5555',
    description: 'Im Hello you Are ME',
    role: 'Musician',
  };

  // get user Role for rendering form


  return (
    <>
      <div className="w-full flex flex-col lg:grid  lg:grid-cols-2 mt-8 px-36 py-12 ">
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
        <div className="flex flex-col  items-center">
          {currentUser?.role === 'admin' ? (
            <BusinessProfileForm admin={admin} />
          ) : (
            <MusicianProfileForm user={user} />
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
