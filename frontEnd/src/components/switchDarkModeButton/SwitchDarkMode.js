import React, { useContext } from 'react';
import { MdDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import { DarkModeContext } from '../../DarkModeContext';

const SwitchDarkMode = () => {
  // Access the darkMode state and toggleDarkMode function from the DarkModeContext
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  // Handle the switch change event and update the dark mode state
  const handleSwitchChange = () => {
    toggleDarkMode();
  };

  // The component renders a toggle switch with icons for dark mode and light mode
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
