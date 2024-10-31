import React, { forwardRef, useEffect, useState } from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
     Button, Dialog, AppBar, Toolbar, IconButton, Typography,
     Slide} from '@mui/material';
import Post from '../Post/Post';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { GetWithAuth } from '../../services/HttpService';

function PopUp(props) {
    const {isOpen, postId, setIsOpen} = props;
    const [open, setOpen] = useState(isOpen);
    const [post, setPost] = useState();

    const getPost = () => {
      GetWithAuth("/posts/"+postId)
      .then(res => res.json())
      .then(
          (result) => {
              console.log(result);
              setPost(result);
           },
           (error) => {
               console.log(error);
           }
      )
    }

    const handleClose = () => {
      setOpen(false);
      setIsOpen(false);
    };

    useEffect(() => {
        setOpen(isOpen);
      }, [isOpen]);

    useEffect(() => {
        getPost();
    }, [postId])

    const CustomAppBar = styled(AppBar)({
        position: 'relative',
    });

    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <CustomAppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              Close
            </Typography>
          </Toolbar>
        </CustomAppBar>
        {post? <Post likes = {post.postLikes} postId = {post.id} userId = {post.userId} userName = {post.userName}  
                    title={post.title} text={post.text}></Post>: "loading"}
      </Dialog>
    )
}

export default function UserActivity(props) {
    const {userId} = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rows, setRows] = useState([]);
    const [isOpen, setIsOpen] = useState();
    const [selectedPost, setSelectedPost] = useState();

    const handleNotification = (postId) => {
        setSelectedPost(postId);
        setIsOpen(true);
    }
    
    const getActivity = () => {
      GetWithAuth("/users/activity/"+userId)
      .then(res => res.json())
      .then(
          (result) => {
              setIsLoaded(true);
              console.log(result);
              setRows(result)
          },
          (error) => {
              console.log(error)
              setIsLoaded(true);
              setError(error);
          }
      )
    }

    useEffect(() => {
        getActivity()
    },[])

  return (
    <div>
    {isOpen? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/>: ""}
    <Paper style={{ width: '80%', padding: '16px', height: 'auto', marginTop: '40px' }} >
    <TableContainer component={Paper} style={{ maxHeight: 400 }} >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            User Activity
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => {
              return (
                <Button onClick={() => handleNotification(row[1])} >
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                  <TableCell align="right">
                  {"| " + row[3] + " " + row[0] + " your post |"}
                  </TableCell>
                </TableRow>
                </Button>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </div>
  )
}
