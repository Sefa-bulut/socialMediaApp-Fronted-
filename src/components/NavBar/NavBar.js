import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import { LockOpen } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userName")
    navigate(0); // Mevcut sayfayı yeniden yükle
  }

  return (
    <div>
            <AppBar position="static">
                <Toolbar>

                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                      <Link to = "/" style={linkStyle} >Home</Link>
                    </Typography>

                    {localStorage.getItem("currentUser") == null ? <Link to = {"/auth"} style={linkStyle}>Login/Register</Link>:
                      <div>
                      <Link to = {"/users/" + localStorage.getItem("currentUser")} style={linkStyle}>Profile</Link>
                      <IconButton onClick={onClick}> <LockOpen > </LockOpen></IconButton>
                      </div>
                    }
                    
                </Toolbar>
            </AppBar>
        </div>
  )
}

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  marginRight: '20px',
  padding: '8px',
  '&:hover': {
      borderBottom: '2px solid white',
  },
};
