import { CardContent } from '@mui/material'
import React, { useState } from 'react'
import { TextField, Button, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { PostWithAuth } from '../../services/HttpService';

export default function CommentForm(props) {
    const {postId, userId, userName, setCommentRefresh} = props;
    const [text, setText] = useState("");

    const handleText = (e) => {
        const {value} = e.target;
        setText(value);
    };

    const handleSubmit = () => {
        saveComment();
        setText("");
        setCommentRefresh();
    }
    const saveComment = () => {
        // fetch ile POST isteği gönder
        PostWithAuth("/comments", {
            postId : postId,
            userId : userId,
            text : text,
        })
        .then((response) => {
           // Yanıt başarılı mı kontrol et
           if (response.ok) {
               return response.json(); // JSON formatında gelen veriyi al
           } else {
               throw new Error('Bir şeyler yanlış gitti!');
           }
        })
        .then((data) => {
               console.log("başarılı")  // API'den gelen id'yi mesaj olarak göster
        })
        .catch((error) => {
               console.log("başarısız")  // Hata mesajını göster
        });
   }

  return (
    <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Link to={`/users/${userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Avatar style={{ marginRight: '10px' }}>
                    {userName.charAt(0).toUpperCase()}
                </Avatar>
            </Link>
            <TextField
                value={text}
                onChange={handleText}
                multiline
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 250 }}
                variant="outlined"
                style={{ marginRight: '10px' }}
            />
            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                style={{ padding: '10px 20px' }} / >
        </Box>
    </CardContent>
  )
}