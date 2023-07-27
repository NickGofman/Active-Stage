import React, { useState } from 'react';
import { Tooltip } from '@material-tailwind/react';
import MainLogo from '../../logo/NJs0uK01.svg';

const NotificationBell = () => {
  const [notificationCount, setNotificationCount] = useState(5); // Replace 5 with the actual number of notifications
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };

  return (
    <Tooltip content={`You Have ${notificationCount} events to assign income`}>
      <div className="relative">
        <button
          onClick={handleClick}
          className="relative flex items-center justify-center w-30 h-30 rounded-full text-white focus:outline-none"
        >
          <img
            src={MainLogo}
            alt="Active-Stage Logo"
            className="w-[150px] h-[100px]"
          />
          {notificationCount > 0 && (
            <span className="absolute -top-1  transform translate-x-7 bg-red-500 rounded-full text-white w-7 h-7 text-base flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </Tooltip>
  );
};

export default NotificationBell;
