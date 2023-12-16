import React from "react";
import { Box } from "@mui/material";
import { FaSearch } from "react-icons/fa";

import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import AvatarProfile from "./AvatarProfile";

const UserDocHeader = () => {
  return (
    <header className="flex items-center p-2 w-full justify-between">
      <Box className="flex items-center">
        <Link to={"/my-docs"}>
          <img src={Logo} className="w-10 h-10" alt="Logo" />
        </Link>
        <Link className="ml-3" to={"/my-docs"}>
          DocFlow
        </Link>
      </Box>
      <Box className="flex items-center">
        <div className="flex items-center">
          <div className="flex space-x-1">
            <input
              type="text"
              className="block w-full px-4 py-1 bg-blue-100 text-blue-700 focus:bg-white border rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
            />
            <button className="p-3 text-white bg-blue-600 rounded-full ">
              <FaSearch />
            </button>
          </div>
        </div>
      </Box>
      <Box>
        <AvatarProfile />
      </Box>
    </header>
  );
};

export default UserDocHeader;
