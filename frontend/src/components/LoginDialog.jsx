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
  const [registerVisible, setRegisterVisible] = React.useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [email, setEmail] = React.useState('');
  
  const authService = new AuthService()
  const cookies = new Cookies();
  
  const [inOrOut, setInOrOut] = React.useState(cookies.get('token') ? 'Logout' : 'Login');

  const handleClickOpen = () => {
    if(inOrOut === 'Login'){
      setOpen(true);
    }
    if(inOrOut === 'Logout'){
      cookies.remove('token');
      setInOrOut('Login');
    }

  };

  const handleClose = () => {
    setOpen(false);
    setRegisterVisible(false);
    setErrorAlertVisible(false);
  };

  const handleCloseLogin = () => {
    authService.getToken(user, password).then((data) => 
      cookies.set('token', data.token, {httpOnly: false})
    );
    setOpen(false);
    setRegisterVisible(false);
    setErrorAlertVisible(false);
    setInOrOut('Logout');
  };

  const handleCloseRegister = () => {
    if(email.includes('@')){
        authService.register(user, password, password2, email).then((data) => 
          cookies.set('token', data.token, {httpOnly: false})
        );
        setOpen(false);
        setRegisterVisible(false);
        setErrorAlertVisible(false);
        // TODO: nice alert
        alert("Account has been created!.")
    }
    else {
      setErrorAlertVisible(true)
    }
    
  };

  const expandRegisterForm = () => {
    setRegisterVisible(true)
  }
  

  return (
    <div>
      
      <Button variant="outlined" onClick={handleClickOpen} style={{marginTop: "-15px", fontFamily: "Bebas Neue", fontSize: "26px", width: "100%", borderRadius: "0", backgroundColor: "#2b2b69", color: "white"}}>
        {inOrOut}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <Alert severity="error" style={{display: errorAlertVisible ? "block" : "none"}}>
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
          <TextField style={{display: registerVisible ? "block" : "none"}}
            autoFocus
            margin="dense"
            id="name"
            label="Repeat Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <TextField style={{display: registerVisible ? "block" : "none"}}
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
          <Button style={{display: registerVisible ? "block" : "none"}} onClick={handleCloseRegister}>Submit</Button>
          <Button onClick={expandRegisterForm}>Register</Button>
          <Button onClick={handleCloseLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}