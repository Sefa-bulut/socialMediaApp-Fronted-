import { CardContent } from '@mui/material'
import React from 'react'
import { TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

export default function Comment(props) {
    const {text, userId, userName} = props;
  return (
    <CardContent>
        <Typography variant="h5" component="div" style={{ display: 'flex', alignItems: 'center' }}>
            <Link to = {`/users/${userId}`} style={{ ...linkStyle, }}>
                <Avatar style={{ marginRight: '10px' }}>
                    {userName.charAt(0).toUpperCase()}
                </Avatar>
            </Link>
            <TextField  
            value={text}
            multiline 
            fullWidth 
            margin="normal"
            InputProps={{
                readOnly: true, // disabled yerine readOnly kullan
                style: { 
                    color: 'black', 
                    backgroundColor: 'transparent', // Arka planı şeffaf yap
                },
            }}
            />
        </Typography>
    </CardContent>
  )
}

const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    marginRight: '20px',
    padding: '8px',
    transition: 'border-bottom 0.3s ease', // Geçiş efekti
};
