import { Button, Card, CardContent, CardMedia, Typography, Modal, Box } from '@mui/material'
import React, { useState } from 'react'
import {List, ListItem, Radio, ListItemSecondaryAction } from '@mui/material';
import { PutWithAuth } from '../../services/HttpService';

export default function Avatar(props) {
    const { avatarId, userId, userName } = props;
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(avatarId);

    const saveAvatar = () => {
      PutWithAuth("/users/" + localStorage.getItem("currentUser"),{
        avatar: selectedValue,
      })
      .then((res) => res.json())
      .catch((err) => console.log(err))
    }

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
      setOpen(false);
      saveAvatar();
    };

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

  return (
    <div>
    <Card style={{ maxWidth: 345, margin: 30 }}>
      <CardMedia
        component="img"
        image={`/avatars/avataaars${selectedValue}.png`}
        alt="User Profile"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kullanıcı hakkında bilgiler buraya gelecek. Burada kullanıcının ilgi alanları, hobileri gibi bilgiler yer alabilir.
        </Typography>
      </CardContent>
      <Button onClick={handleOpen} size="small" color="primary" style={{ margin: '16px' }}>
        Change Avatar
      </Button>
    </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bir Avatar Seçin
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <List dense>
            {[1, 2, 3, 4, 5, 6].map((key) => {
                const labelId = `checkbox-list-secondary-label-${key}`;
                return (
                <ListItem key={key} button>
                    <CardMedia
                    style = {{maxWidth: 80}}
                    component="img"
                    alt={`Avatar n°${key}`}
                    image={`/avatars/avataaars${key}.png`}
                    title="User Avatar"
                    />
                    <ListItemSecondaryAction>
                    <Radio
                        edge="end"
                        value= {key}
                        onChange={handleChange}
                        checked={""+selectedValue === ""+key}
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                    </ListItemSecondaryAction>
                </ListItem>
                );
            })}
    </List>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
