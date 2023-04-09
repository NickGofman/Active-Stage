import MainLogo from '../../logo/NJs0uK01.svg';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
const date = new Date();
const currentYear = date.getFullYear();

function Footer() {
  return (
    <footer>
      <div className="flex items-center justify-evenly  text-gray-600 lg:flex-row flex-col">
        <div className=" px-5 py-5">
          <div data-field="phone">
            <a
              href="tel:+972-50-831-7378"
              data-tracking-element-type="3"
              dir="ltr"
            >
              Call now
            </a>
            <ul>
              <li dir="ltr">050-831-7378</li>
              <li dir="ltr">052-435-1437</li>
            </ul>
          </div>
        </div>
        <div className="px-5 py-5">
          <h3 className="text-black">Address</h3>
          <div>
            <address>
              <div>Derekh Yafo 35</div>
              <div>Haifa</div>
              <div>Israel</div>
            </address>
          </div>
        </div>
        <div className="px-5 py-5">
          <h3 className="text-black">Contact Us</h3>

          <div className="flex flex-row space-x-3">
            <a href="https://www.instagram.com/elispub/">
              <FaInstagram size={40} />
            </a>
            <a href="https://www.facebook.com/elis.pub/">
              <FaFacebook size={40} />
            </a>
          </div>
        </div>
        <div className=" px-5 py-5 flex space-y-6 ">
          <img
            src={MainLogo}
            alt="Active-Stage Logo"
            className="w-[124px] h-[80px]"
          />
          <p className="ml-3 text-xl">Active Stage</p>
        </div>
      </div>

      <p className=" text-center text-sm text-gray-500 sm:ml-4 sm:pl-4 ">
        © {currentYear} Active Stage @Nick Gofman & Saar Yanckovich
      </p>
    </footer>
  );
}

export default Footer;
