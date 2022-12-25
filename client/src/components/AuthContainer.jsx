import React, { useState } from 'react'
import styles from '../styles/AuthContainer.module.scss';
import userPng from '../styles/assets/user.png';
import { Box, Button, Avatar, Tabs, Tab } from '@mui/material';
import { Login, Register, TabPanel } from './index';
import services from '../shared/services'
import { useDispatch, useSelector } from 'react-redux'
import { updateErrors, clearErrors } from '../shared/errorsSlice';
import { setUser } from '../shared/userSlice';
import { useNavigate } from "react-router-dom";

function AuthContainer() {
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0);
  const [userState, setUserState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [regSuccess, setRegSuccess] = useState(false)
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearErrors())

    if (tabValue === 0) {
      login(userState)
    } else if (tabValue === 1) {
      register(userState)
    }
    return;
  };

  async function register({ username, email, password, confirmPassword }) {
    if (password !== confirmPassword) {
      dispatch(updateErrors('Passwords don\'t match'))
    } else {
      try {
        const res = await services.register({
          username,
          email,
          password
        });

        if (!res.ok) {
          throw new Error(res?.error?.message)
        } else {
          handleTabChange('', 0);
          setRegSuccess(true)
        }
      } catch (error) {
        console.error(error);
        dispatch(updateErrors(error.message))
      }
    }
  }

  async function login({ email, password }) {
    try {
      const res = await services.login({
        email,
        password
      });
      dispatch(setUser({
        username: res.username,
        email: res.email,
        userId: res._id
      }));
      if (!res.ok) {
        throw new Error(res?.error?.message)
      } else {
        navigate('/home')
      }
    } catch (error) {
      console.error(error);
      dispatch(updateErrors(error.message))
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setUserState(oldState => ({ ...oldState, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <Avatar sx={{ width: 100, height: 100, margin: '10px' }} alt="User" src={userPng} />
      <Box
        className={styles.form}
        component="form"
        onSubmit={onSubmit}
        sx={{
          '& .MuiTextField-root': {
            marginBottom: '5px',
            width: '300px'
          },
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{
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
          <TabPanel value={tabValue} index={0} className='tab-panel' style={{ display: 'flex', flexDirection: 'column' }}>
            <Login handleValueChange={handleValueChange} />
          </TabPanel>
          <TabPanel value={tabValue} index={1} className='tab-panel' style={{ display: 'flex', flexDirection: 'column' }}>
            <Register handleValueChange={handleValueChange} />
          </TabPanel>
        </Box>
        {errors.length > 0 && errors.map((err, idx) => (<div className={styles.error} key={idx}>{err}</div>))}
        {regSuccess && (<div className={styles.success}>Registration successful!</div>)}
        <Button className={styles.btn_submit} type='submit'>Submit</Button>
      </Box>
    </div>
  );
}

export default AuthContainer
