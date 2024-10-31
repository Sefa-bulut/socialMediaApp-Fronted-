import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions, IconButton } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { ThumbUp } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import Comment from '../Comment/Comment';
import CommentForm from '../Comment/CommentForm';
import { DeleteWithAuth, PostWithAuth } from '../../services/HttpService';

export default function Post(props) {
    //propslar ile aldıgımız post verileri
    const {postId, title, text, userName, userId, likes} = props;
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount = useRef(true);
    const [likeId, setLikeId] = useState(null);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [refresh, setRefresh] = useState(false);
    let disabled = localStorage.getItem("currentUser") == null ? true : false;

    const setCommentRefresh = () => {
        setRefresh(true);
    }

    const handleToggle = () => {
        setOpen(!open);
        refreshComments();
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            saveLike();
            setLikeCount(likeCount + 1);
        } else {
            deleteLike();
            setLikeCount(likeCount - 1);
        }
    };

    const refreshComments = () => {
        fetch("/comments?postId="+postId)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setCommentList(data);
            setIsLoaded(true);
        })
        .catch(error => {
            setError(error);
            setIsLoaded(true);
        });

        setRefresh(false);
    }

    const saveLike = () => {
        PostWithAuth("/likes",{
            postId : postId,
            userId : localStorage.getItem("currentUser"),
        })
        .then((response) => response.json())
        .catch((err) => console.log(err))
    };

    const deleteLike = () => {
        DeleteWithAuth("/likes/"+likeId)
          .catch((err) => console.log(err))
    };

    const checkLikes = () => {
        var likeControl = likes.find((like => ""+like.userId === localStorage.getItem("currentUser")));
        if (likeControl != null) {
            setLikeId(likeControl.id);
            setIsLiked(true);
        }
    };

    useEffect(() => {
        if(isInitialMount.current)
            isInitialMount.current = false;
        else
            refreshComments();
    },[refresh]);
    
    useEffect(() => {
        checkLikes();
    },[]);

    return(
        <div style={{ padding: '20px', maxWidth: '650px', margin: 'auto' }}>
        <Card>
            <CardContent>
                <Typography variant="h5" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                <Link to = {`/users/${userId}`} style={{ ...linkStyle, }}>
                    <Avatar style={{ marginRight: '10px' }}>
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                </Link>
                    {title}
                </Typography>
                <Typography variant="h7" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                    {text}
                </Typography>
            </CardContent>

            <CardActions style={{ justifyContent: 'space-between' }}>
            {disabled ?                    
                  <IconButton 
                    disabled
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
                    <ThumbUp style={isLiked? { color: "red" } : null} />
                    </IconButton> :
                    <IconButton onClick={handleLike} aria-label="add to favorites">
                    <ThumbUp style={isLiked? { color: "red" } : null} />
                    {likeCount}
                    </IconButton>
                  }

                <IconButton onClick={handleToggle}>
                    <CommentIcon fontSize="small" />
                </IconButton>
            </CardActions>

            {open && (
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {error? "error" : isLoaded? commentList.map(comment => (
                            <Comment text={comment.text} userId={comment.userId} userName={comment.userName}/>
                        )) : "Loading..."}
                        {disabled ? "" :
                        <CommentForm userId = {localStorage.getItem("currentUser")} userName = {localStorage.getItem("userName")} postId = {postId} setCommentRefresh={setCommentRefresh}/>}
                        
                    </Typography>
                </CardContent>
            )}
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
