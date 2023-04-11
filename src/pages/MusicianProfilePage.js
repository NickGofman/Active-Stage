import React from 'react';
import { Button } from '@material-tailwind/react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import MusicianProfileForm from '../components/forms/MusicianProfileForm';
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
       <MusicianProfileForm/>
      </div>
    </>
  );
}

export default MusicianProfilePage;
