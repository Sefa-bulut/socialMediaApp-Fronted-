import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '../Avatar/Avatar';
import UserActivity from '../UserActivity/UserActivity';
import { GetWithAuth } from '../../services/HttpService';

export default function User() {
  const styles = {
    root: {
      display: 'flex',// Flexbox özelliği
    },
  };

  const { userId } = useParams();
  const [user, setUser] = useState();

  const getUser = () => {
    GetWithAuth("/users/"+userId)
    .then(res => res.json())
    .then(
        (result) => {
            console.log(result);
            setUser(result);
        },
        (error) => {
            console.log(error)
        }
    )
  }

  useEffect(() => {
    getUser();
  },[]);

  return (
    <div style={styles.root} >
      {user? <Avatar avatarId={user.avatarId} userId={userId} userName={user.userName} />: ""}
      <UserActivity userId={userId} />
    </div>
  )
}


