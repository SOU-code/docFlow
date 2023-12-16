import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { FaShare, FaSave, FaPrint } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import AvatarProfile from "./AvatarProfile";
const CreateDocHeader = () => {
  const [inputValue, setInputValue] = useState("untitled");

  const handleInputChange = (e) => {
    if (!e.target.value) {
      setInputValue("untitled");
    } else {
      setInputValue("File Name");
    }
  };
  return (
    <header className="flex items-center p-2 w-full justify-between">
      <Box className="flex items-center">
        <Link to={"/my-docs"}>
          <img src={Logo} className="w-10 h-10 mr-5" alt="Logo" />
        </Link>
        <Box>
          <TextField
            id="outlined-primary"
            label={inputValue}
            variant="outlined"
            size="small"
            onChange={handleInputChange}
            className=""
          />
        </Box>
        <Link className="ml-3">
          <FaSave className="w-7 h-7" />
        </Link>
      </Box>
      <Box className="flex items-center">
        <Link className="mr-10">
          <FaPrint className="w-5 h-5" />
        </Link>
        <Button variant="outlined" size="small" endIcon={<FaShare />}>
          share
        </Button>
        <AvatarProfile />
      </Box>
    </header>
  );
};

export default CreateDocHeader;
