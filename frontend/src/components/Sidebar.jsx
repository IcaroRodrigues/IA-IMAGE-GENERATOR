import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';
import imageGenerator from '../assets/imagegeneratoricon.svg';
import feedicon from '../assets/feedicon.svg';
import historyicon from '../assets/historyicon.svg';
import mycollectionicon from '../assets/mycolectionicon.svg';
import Loginicon from '../assets/loginicon.svg';

function Sidebar() {
  return (
    <div className="flex flex-col justify-between bg-gray-900  w-[70px] min-h-screen p-4">
      {/* Top Section: Logo + Icons */}
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-[22px] h-[22px]" />
        </div>

        {/* Icons */}
        <div className="flex flex-col items-center  gap-4 mt-[53px]">
          <Link to="/">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] hover:bg-[#7C71FF] ">
              <img src={imageGenerator} alt="Image generator" className="w-[24px] h-[24px]" />
            </div>
          </Link>
          <Link to="/feed">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] hover:bg-[#7C71FF] ">
              <img src={feedicon} alt="Feed" className="w-[24px] h-[24px]" />
            </div>
          </Link>
          <Link to="/history">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] hover:bg-[#7C71FF] ">
              <img src={historyicon} alt="History" className="w-[24px] h-[24px]" />
            </div>
          </Link>
          <Link to="/my-colection">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] hover:bg-[#7C71FF] ">
              <img src={mycollectionicon} alt="My Collection" className="w-[24px] h-[24px]" />
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Section: Login */}
      <div className="flex justify-center ">
        <Link to="/login">
          <img
            src={Loginicon}
            alt="Login"
            className="w-[40px] h-[40px] transform transition-transform duration-200 hover:scale-110 "
          />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
