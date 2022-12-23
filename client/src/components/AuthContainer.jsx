import React from 'react'
import styles from '../styles/Login.module.scss';
import userPng from '../styles/assets/user.png';
import { TextField, Box, Button, Avatar } from '@mui/material';

function handleSubmit(e) {
  e.preventDefault()
  console.log(e.target)
  console.log(process.env.REACT_APP_TMDB_API_KEY);
}

function AuthContainer() {
  return (
    <div className={styles.container}>
      <Avatar sx={{ width: 100, height: 100, margin: '10px' }} alt="User" src={userPng} />
      <Box
        className={styles.form}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': {
            m: '5px',
            width: '300px'
          },
        }}
      >
        <TextField label="Email address" type="email" name="email" variant="filled" sx={{
          '.MuiInputLabel-root': {
            color: '#01b4e4'
          },
          '.MuiInputLabel-root.Mui-focused': {
            color: '#1ed5a9'
          },
          '.MuiFilledInput-root': {
            color: '#d2d2d2'
          },
        }} />
        <TextField label="Password" type="password" name="password" variant="filled" sx={{
          '.MuiInputLabel-root': {
            color: '#1ed5a9'
          },
          '.MuiInputLabel-root.Mui-focused': {
            color: '#01b4e4'
          },
          '.MuiFilledInput-root': {
            color: '#d2d2d2'
          },
        }}/>
        <Button className={styles.btn_submit} type='submit'>Submit</Button>
      </Box>
    </div>
  );
}

export default AuthContainer
