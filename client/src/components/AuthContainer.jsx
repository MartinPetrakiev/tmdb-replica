import React, { useState } from 'react'
import styles from '../styles/AuthContainer.module.scss';
import userPng from '../styles/assets/user.png';
import { Box, Button, Avatar, Tabs, Tab } from '@mui/material';
import Login from './Login';
import Register from './Register';
import TabPanel from './TabPanel';


function handleSubmit(e) {
  e.preventDefault()
  console.log(e.target)
  console.log(process.env.REACT_APP_TMDB_API_KEY);
}

function AuthContainer() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} sx={{
              '& .MuiTabs-flexContainer': {
                display: 'flex',
                justifyContent: 'center',
              },
              '& .MuiButtonBase-root': {
                color: '#01b4e4',
              },
              '& .MuiButtonBase-root.Mui-selected': {
                color: '#1ed5a9',
                backgroundColor: '#213463'
              }
            }}>
              <Tab label="Login" sx={{
                '&': {
                  borderTopLeftRadius: '10px',
                  flex: 0.5
                }
              }} />
              <Tab label="Register" sx={{
                '&': {
                  borderTopRightRadius: '10px',
                  flex: 0.5
                }
              }} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} className='tab-panel' style={{ display: 'flex', flexDirection: 'column' }}>
            <Login />
          </TabPanel>
          <TabPanel value={value} index={1} className='tab-panel' style={{ display: 'flex', flexDirection: 'column' }}>
            <Register />
          </TabPanel>
        </Box>
        <Button className={styles.btn_submit} type='submit'>Submit</Button>
      </Box>
    </div>
  );
}

export default AuthContainer
