import React, { useContext } from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
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
        <div className="block bg-gray-400 w-12 h-6 rounded-full"></div>
        <div
          className={`${
            darkMode ? 'bg-blue-500' : 'bg-white'
          } absolute left-0 top-0 w-6 h-6 rounded-full transition-transform flex items-center justify-center`}
          style={{ transform: darkMode ? 'translateX(100%)' : 'translateX(0)' }}
        >
          {darkMode ? (
            <MdDarkMode className="text-white text-sm" />
          ) : (
            <MdOutlineDarkMode className="text-yellow-500 text-sm" />
          )}
        </div>
      </div>
    </label>
  );
};

export default SwitchDarkMode;
