import React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const DrawerExample = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  // let isLogin = useSelector((state) => state.isLogin);
  // isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      alert("Logout successfully");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <Avatar
        src="/broken-image.jpg"
        onClick={handleDrawerOpen}
        className="ml-5 cursor-pointer"
      />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        onClick={(event) => {
          // Close the drawer when clicking outside of it
          if (!event.target.closest("#drawer-content")) {
            handleDrawerClose();
          }
        }}>
        <div id="drawer-content">
          <Card>
            <CardContent className="flex flex-col space-y-1">
              <Typography variant="h6" component="div">
                Welcome,
              </Typography>
              <p className="italic text-blue-950 font-bold">Demo Name</p>
              <Link to={"/my-docs"}>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-2"
                  onClick={handleDrawerClose}>
                  My Docs
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="error"
                className="mt-2"
                onClick={handleLogout}>
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </Drawer>
    </div>
  );
};

export default DrawerExample;
