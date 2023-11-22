import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./horizontal_nav.css";
import contents from "../../data/navbarContent";
import { widthToChangeNav, heightToChangeNav } from "../../services/constants";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

function HorizontalNav({ user_email }) {
  // responsive navbar following window scroll
  const [path, setPath] = useState(window.location.pathname);
  const [scrolled, setScrolled] = useState(false);

  // active hamburger navbar
  const [actived, setActived] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const navigate = useNavigate();
  const handleSignin = () => {
    navigate("/sign-in");
  };
  const handleSignup = () => {
    navigate("/sign-up");
  };
  const handleLogout = () => {
    setAnchorEl(null);
    // localStorage.removeItem("accessToken");
    Cookies.remove("authToken");
    // console.log("logout");
    navigate("/");
    window.location.reload();
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const element = document.querySelector(":root");
    const navbar = document.querySelector(".horizontal-nav");
    setPath(window.location.pathname);
    const onScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
        element.style.setProperty("--text-horizontal-nav", "var(--blue)");
        navbar.style.backgroundColor = "var(--horizontal-nav)";
      } else {
        setScrolled(false);
        if (screenWidth > widthToChangeNav) {
          if (path === "/") {
            element.style.setProperty("--text-horizontal-nav", "var(--white)");
            navbar.style.backgroundColor = "inherit";
            console.log("whiteee")
          } else {
            element.style.setProperty("--text-horizontal-nav", "var(--blue)");
            navbar.style.backgroundColor = "inherit";
          }
        }
      }
    };

    if (screenWidth <= widthToChangeNav) {
      element.style.setProperty("--text-horizontal-nav", "var(--blue)");
      navbar.style.backgroundColor = "var(--horizontal-nav)";
    }
    //
    else {
      navbar.style.backgroundColor = "transparent";
    }

    const handleResizeWindow = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    // deactive hamburger navbar when height or width changed
    if (
      screenHeight > heightToChangeNav &&
      actived &&
      screenWidth > widthToChangeNav
    ) {
      setActived(false);
    }

    window.addEventListener("resize", handleResizeWindow);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [actived, screenWidth, screenHeight, path]);

  const isActive = () => {
    if (actived) {
      setActived(false);
    } else {
      setActived(true);
    }
  };

  const closeActive = () => {
    if (actived) {
      setActived(false);
    }
  };

  const handleScroll = () => {
    const element = document.getElementById("sprots-scroll");
    element.scrollIntoView();
}

  return (
    <div>
      <nav className={scrolled ? "horizontal-nav scrolled" : "horizontal-nav"}>
        <Link className="logo-navigate" to="/">
          <ul className="logo">
            <div className="circle-svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="74"
                height="35"
                viewBox="0 0 74 35"
                fill="none"
              >
                <path
                  d="M11.5 22.7852C17.299 22.7852 22 18.0841 22 12.2852C22 6.48617 17.299 1.78516 11.5 1.78516C5.70101 1.78516 1 6.48617 1 12.2852C1 18.0841 5.70101 22.7852 11.5 22.7852Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M36.5996 22.7852C42.3986 22.7852 47.0996 18.0841 47.0996 12.2852C47.0996 6.48617 42.3986 1.78516 36.5996 1.78516C30.8006 1.78516 26.0996 6.48617 26.0996 12.2852C26.0996 18.0841 30.8006 22.7852 36.5996 22.7852Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M61.5996 22.7852C67.3986 22.7852 72.0996 18.0841 72.0996 12.2852C72.0996 6.48617 67.3986 1.78516 61.5996 1.78516C55.8006 1.78516 51.0996 6.48617 51.0996 12.2852C51.0996 18.0841 55.8006 22.7852 61.5996 22.7852Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M23.9004 33.4851C29.6994 33.4851 34.4004 28.7841 34.4004 22.9851C34.4004 17.1861 29.6994 12.4851 23.9004 12.4851C18.1014 12.4851 13.4004 17.1861 13.4004 22.9851C13.4004 28.7841 18.1014 33.4851 23.9004 33.4851Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  className="test1"
                  d="M49.0996 33.4851C54.8986 33.4851 59.5996 28.7841 59.5996 22.9851C59.5996 17.1861 54.8986 12.4851 49.0996 12.4851C43.3006 12.4851 38.5996 17.1861 38.5996 22.9851C38.5996 28.7841 43.3006 33.4851 49.0996 33.4851Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
              </svg>
            </div>
            <span>PARIS 2024</span>
          </ul>
        </Link>

        <ul className="navigate">
          {user_email ? (
            <div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  marginRight: "1rem",
                }}
              >
                <Tooltip title={user_email}>
                  {/* <Tooltip> */}
                  <IconButton
                    //   style={{padding:"1rem"}}
                    onClick={handleClick}
                    size="medium"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      className="profile-btn"
                      sx={{ width: 32, height: 32 }}
                    >
                      {user_email.slice(0, 1)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    // fontFamily: "Kanit, sans-serif",
                    borderRadius: "0.5rem",
                    bgcolor: " #FFFFFF",
                    color: "#484848",
                    overflow: "visible",
                    // border : "1px solid #E3E3E3",
                    filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      //   fontFamily: "Kanit, sans-serif",
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: " #FFFFFF",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={handleClose}
                  style={{ fontFamily: "Kanit, sans-serif" }}
                >
                  <Avatar /> {user_email}
                </MenuItem>

                <Divider />

                <MenuItem
                  onClick={handleLogout}
                  style={{ fontFamily: "Kanit, sans-serif" }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="group-botton">
              <Box
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {/* <Tooltip title={user_email}> */}
                <Tooltip>
                  <Button
                    //   style={{padding:"1rem"}}
                    onClick={handleSignin}
                    size="medium"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    style={{color: "white"}}
                  >
                    Sign In
                  </Button>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip>
                  <Button
                    onClick={handleSignup}
                    size="medium"
                    sx={{ ml: 2, border: "2px solid #D5D1D1" }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    style={{color: "white"}}
                  >
                    Sign Up
                  </Button>
                </Tooltip>
              </Box>
            </div>
          )}
          {/* <li><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 20 21" fill="none">
                        <path d="M3.85 15.6C4.7 14.95 5.65 14.4373 6.7 14.062C7.75 13.6867 8.85 13.4993 10 13.5C11.15 13.5 12.25 13.6877 13.3 14.063C14.35 14.4383 15.3 14.9507 16.15 15.6C16.7333 14.9167 17.1877 14.1417 17.513 13.275C17.8383 12.4083 18.0007 11.4833 18 10.5C18 8.28333 17.221 6.39567 15.663 4.837C14.105 3.27833 12.2173 2.49933 10 2.5C7.78333 2.5 5.89567 3.279 4.337 4.837C2.77833 6.395 1.99933 8.28267 2 10.5C2 11.4833 2.16267 12.4083 2.488 13.275C2.81333 14.1417 3.26733 14.9167 3.85 15.6ZM10 11.5C9.01667 11.5 8.18733 11.1627 7.512 10.488C6.83667 9.81333 6.49933 8.984 6.5 8C6.5 7.01667 6.83733 6.18733 7.512 5.512C8.18667 4.83667 9.016 4.49933 10 4.5C10.9833 4.5 11.8127 4.83733 12.488 5.512C13.1633 6.18667 13.5007 7.016 13.5 8C13.5 8.98333 13.1627 9.81267 12.488 10.488C11.8133 11.1633 10.984 11.5007 10 11.5ZM10 20.5C8.61667 20.5 7.31667 20.2373 6.1 19.712C4.88333 19.1867 3.825 18.4743 2.925 17.575C2.025 16.675 1.31267 15.6167 0.788 14.4C0.263333 13.1833 0.000666667 11.8833 0 10.5C0 9.11667 0.262667 7.81667 0.788 6.6C1.31333 5.38333 2.02567 4.325 2.925 3.425C3.825 2.525 4.88333 1.81267 6.1 1.288C7.31667 0.763333 8.61667 0.500667 10 0.5C11.3833 0.5 12.6833 0.762667 13.9 1.288C15.1167 1.81333 16.175 2.52567 17.075 3.425C17.975 4.325 18.6877 5.38333 19.213 6.6C19.7383 7.81667 20.0007 9.11667 20 10.5C20 11.8833 19.7373 13.1833 19.212 14.4C18.6867 15.6167 17.9743 16.675 17.075 17.575C16.175 18.475 15.1167 19.1877 13.9 19.713C12.6833 20.2383 11.3833 20.5007 10 20.5ZM10 18.5C10.8833 18.5 11.7167 18.3707 12.5 18.112C13.2833 17.8533 14 17.4827 14.65 17C14 16.5167 13.2833 16.1457 12.5 15.887C11.7167 15.6283 10.8833 15.4993 10 15.5C9.11667 15.5 8.28333 15.6293 7.5 15.888C6.71667 16.1467 6 16.5173 5.35 17C6 17.4833 6.71667 17.8543 7.5 18.113C8.28333 18.3717 9.11667 18.5007 10 18.5ZM10 9.5C10.4333 9.5 10.7917 9.35833 11.075 9.075C11.3583 8.79167 11.5 8.43333 11.5 8C11.5 7.56667 11.3583 7.20833 11.075 6.925C10.7917 6.64167 10.4333 6.5 10 6.5C9.56667 6.5 9.20833 6.64167 8.925 6.925C8.64167 7.20833 8.5 7.56667 8.5 8C8.5 8.43333 8.64167 8.79167 8.925 9.075C9.20833 9.35833 9.56667 9.5 10 9.5Z" fill="black" />
                    </svg></Link></li> */}

          <li className="hamburger" onClick={isActive}>
            <div className={actived ? "active" : ""}></div>
          </li>
        </ul>
      </nav>

      {actived ? (
        <nav className="hamburger-nav open">
          <ul>
            {contents.map((content, index) => {
              return (
                <li id={contents.id} key={index}>
                  <Link onClick="closeActive();handleScroll();" to={content.to}>
                    {content.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : (
        <nav className="hamburger-nav">
          <ul>
            {contents.map((content, index) => {
              return (
                <li id={contents.id} key={index}>
                  <Link onClick="closeActive();handleScroll();" to={content.to}>
                    {content.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default HorizontalNav;
