import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AuthService from '../services/AuthService';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'universal-cookie';
import Typography from '@mui/material/Typography';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { button } from '../common/styles';


export default function LoginDialog() {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState('');
    const [registerVisible, setRegisterVisible] = React.useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [email, setEmail] = React.useState('');

    const authService = new AuthService();
    const cookies = new Cookies();

    const [isLoggedIn, setIsLoggedIn] = React.useState(cookies.get('token') && cookies.get('token') !== 'undefined');

    const handleClickOpen = () => {
        if (isLoggedIn) {
            setOpen(true);
        } else {
            cookies.remove('token');
            setIsLoggedIn(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setRegisterVisible(false);
        setErrorAlertVisible(false);
    };

    const handleCloseLogin = async () => {
        await authService.getToken(user, password).then((data) =>
            cookies.set('token', data.token, { httpOnly: false })
        );
        setOpen(false);
        setRegisterVisible(false);
        setErrorAlertVisible(false);
        setIsLoggedIn('Logout');
    };

    const handleCloseRegister = async () => {
        if (email.includes('@')) {
            await authService.register(user, password, password2, email).then((data) =>
                cookies.set('token', data.token, { httpOnly: false })
            );
            setOpen(false);
            setRegisterVisible(false);
            setErrorAlertVisible(false);
            // TODO: nice alert
            alert('Account has been created!.');
        }
        else {
            setErrorAlertVisible(true);
        }

    };

    const expandRegisterForm = () => {
        setRegisterVisible(true);
    };


    return (
        <div>

            <Button variant="outlined" onClick={handleClickOpen} style={button}>

                <Typography variant="h5">
                    {isLoggedIn ? 'Logout' : 'Login'}
                </Typography>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <Alert severity="error" sx={{ display: errorAlertVisible ? 'block' : 'none' }}>
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
                    <TextField style={{ display: registerVisible ? 'block' : 'none' }}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Repeat Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <TextField style={{ display: registerVisible ? 'block' : 'none' }}
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
                    <Button style={{ display: registerVisible ? 'block' : 'none' }} onClick={handleCloseRegister}>Submit</Button>
                    <Button onClick={expandRegisterForm}>Register</Button>
                    <Button onClick={handleCloseLogin}>Login</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
