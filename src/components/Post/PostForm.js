import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { PostWithAuth } from '../../services/HttpService';

// Alert bileşenini özelleştiriyoruz
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PostForm(props) {
    //propslar ile aldıgımız post verileri
    const {userName, userId, refreshPosts} = props;

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    const [open, setOpen] = useState(false);  // Snackbar'ın açık olup olmadığını kontrol eder
    const [message, setMessage] = useState(""); // Snackbar mesajını kontrol eder
    
    const handleTitle = (e) => {
        const {value} = e.target;
        setTitle(value);
    };
    const handleText = (e) => {
        const {value} = e.target;
        setText(value)
    };

    const handleSubmit = () => {
        savePost();
        refreshPosts();
        //inputları boşaltma
        setTitle("");
        setText("");
         // Snackbar mesajı ve gösterilmesi
        setMessage("Post başarıyla gönderildi!");
        setOpen(true);
    }

    // Snackbar'ı kapatmak için kullanılan fonksiyon
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const savePost = () => {
        PostWithAuth("/posts", {
          title: title, 
          userId : userId,
          text : text,
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

  return (
    <div style={{ padding: '20px', maxWidth: '650px', margin: 'auto' }}>
        {/* Snackbar (5sn) */}
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{
          vertical: 'bottom',  // Dikeyde alt kısım
          horizontal: 'center',  // Yatayda ortada
        }}>
            <Alert onClose={handleClose} severity="success">
                {message}
            </Alert>
        </Snackbar>
        <Card>
            <CardContent>
                <Typography variant="h5" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to = {`/users/${userId}`} style={{ ...linkStyle, }}>
                        <Avatar style={{ marginRight: '10px' }}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>

                    <TextField value={title} onChange={handleTitle} inputProps={{ maxLength: 25 }} 
                    multiline label="Title" name="firstName" fullWidth margin="normal"/>
                </Typography>

                    <TextField value={text} onChange={handleText} inputProps={{ maxLength: 250 }}
                    multiline label="Text" name="firstName" fullWidth margin="normal"/>

                    <Button onClick={handleSubmit} type="submit" variant="contained"
                    color="primary" fullWidthsx={{ marginTop: '20px' }}>
                        Gönder
                    </Button>
            </CardContent>
        </Card>
    </div>
  );
}

const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    marginRight: '20px',
    padding: '8px',
    transition: 'border-bottom 0.3s ease', // Geçiş efekti
  };
