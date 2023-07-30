import React, { useContext } from 'react';
import { MdDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import { DarkModeContext } from '../../DarkModeContext';

const SwitchDarkMode = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const handleSwitchChange = () => {
    toggleDarkMode();
  };

  return (
    <label className="flex flex-col items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          onChange={handleSwitchChange}
          defaultChecked={darkMode}
        />
        <div className="block bg-blue-gray-200 w-8 h-4 rounded-full"></div>
        <div
          className={`${
            darkMode ? 'bg-blue-500' : 'bg-yellow-100'
          } absolute left-0 top-0 w-4 h-4 rounded-full transition-transform flex items-center justify-center`}
          style={{ transform: darkMode ? 'translateX(100%)' : 'translateX(0)' }}
        >
          {darkMode ? (
            <MdDarkMode className="text-black text-sm" />
          ) : (
            <MdOutlineWbSunny className="text-yellow-900 text-sm" />
          )}
        </div>
      </div>
    </label>
  );
};

export default SwitchDarkMode;
