import React from 'react';
import { TextField, styled} from '@mui/material';

const CustomTextField = styled(TextField)({
    '.MuiInputLabel-root': {
      color: '#1976d2'
    },
    '.MuiInputLabel-root.Mui-focused': {
      color: '#1ed5a9'
    },
    '.MuiFilledInput-root': {
      color: '#d2d2d2',
    },
    '.MuiFilledInput-root:before' : {
        borderBottom: '2px solid #1976d2'
    },
    '.MuiFilledInput-root:hover' : {
        borderBottom: '1px solid #1ed5a9'
    },
    '.MuiFilledInput-root:after' : {
        borderBottom: '2px solid #1ed5a9'
    }
  });

const Login = ({handleValueChange}) => {
    return (
        <>
            <CustomTextField
                label="Email address"
                type="email"
                name="email"
                variant="filled"
                onChange={handleValueChange}
            />
            <CustomTextField
                label="Password"
                type="password"
                name="password"
                variant="filled"
                onChange={handleValueChange}
            />
        </>
    )
}

export default Login