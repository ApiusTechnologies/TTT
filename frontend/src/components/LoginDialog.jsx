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

export default function LoginDialog() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const authService = new AuthService()
  const cookies = new Cookies();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    authService.getToken(user, password).then((data) => 
      cookies.set('token', data.token, {httpOnly: false})
    );
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Register</Button>
          <Button onClick={handleClose}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}