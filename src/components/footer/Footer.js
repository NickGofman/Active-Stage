import { useContext } from 'react';
import DarkModeContext from '../../DarkModeContext';
import ReactLogo from '../../logo/NJs0uK01.svg';

const date = new Date();
const currentYear = date.getFullYear();

function Footer() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <footer>
      <div className=" px-5 py-8 mx-auto flex items-center sm:flex-row flex-col justify-center space-y-6">
        <a className="flex title-font font-medium items-center md:justify-start  text-gray-900">
          <img
            src={ReactLogo}
            alt="Active-Stage Logo"
            className="w-[124px] h-[80px]"
          />
          <span className=" text-gray-600 ml-3 text-xl">Active Stage</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 ">
          © {currentYear} Active Stage @Nick Gofman & Saar Yankovich
        </p>
        <div
          className="flex
        "
        >
          <a className=" ml-3 text-gray-500">
            <svg
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-8 h-8"
              viewBox="0 0 24 24"
            >
              <a href="https://www.facebook.com/elis.pub/">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </a>
            </svg>
          </a>

          <a className="ml-3 text-gray-500">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-8 h-8"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <a href="https://www.instagram.com/elispub/?hl=en">
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </a>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
