import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AuthService from "../services/AuthService"

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'universal-cookie';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function LoginDialog() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState('');
  const [registerVisible, setRegisterVisible] = React.useState('none');
  const [errorAlertVisible, setErrorAlertVisible] = React.useState('none');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [email, setEmail] = React.useState('');

  const authService = new AuthService()
  const cookies = new Cookies();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRegisterVisible('none');
    setErrorAlertVisible('none');
  };

  const handleCloseLogin = () => {
    authService.getToken(user, password).then((data) => 
      cookies.set('token', data.token, {httpOnly: false})
    );
    setOpen(false);
    setRegisterVisible('none');
    setErrorAlertVisible('none');
  };

  const handleCloseRegister = () => {
    if(email.includes('@')){
        authService.register(user, password, password2, email).then((data) => 
          console.log(data)
          // cookies.set('token', data.token, {httpOnly: false})
        );
        setOpen(false);
        setRegisterVisible('none');
        setErrorAlertVisible('none');
        // TODO: nice alert
        alert("Account has been created!.")
    }
    else {
      setErrorAlertVisible('block')
    }
    
  };

  const expandRegisterForm = () => {
    setRegisterVisible('block')
  }
  

  return (
    <div>
      
      <Button variant="outlined" onClick={handleClickOpen} style={{backgroundColor: "#2b2b69", color: "white"}}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <Alert severity="error" style={{display: errorAlertVisible}}>
          <AlertTitle>Error</AlertTitle>
          This is not a valid Email address.
        </Alert>
        
        <DialogContent>
          <DialogContentText>
            In order to access new features please login with your credentials.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Login"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField style={{display: registerVisible}}
            autoFocus
            margin="dense"
            id="name"
            label="Repeat Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <TextField style={{display: registerVisible}}
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{display: registerVisible}} onClick={handleCloseRegister}>Submit</Button>
          <Button onClick={expandRegisterForm}>Register</Button>
          <Button onClick={handleCloseLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}