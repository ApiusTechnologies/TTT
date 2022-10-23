import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AuthService from '../services/AuthService';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Container } from '@mui/material';
import { emailValidator, password2Validator, passwordValidator } from '../common/validators';
import CookieService from '../services/CookieService';
import LocalStorageService from '../services/LocalStorageService';

const Alerts = {
    LogoutSuccess: 'LogoutSuccess',
    LoginSuccess: 'LoginSuccess',
    LoginError: 'LoginError',
    RegisterSuccess: 'RegisterSuccess',
    RegisterError: 'RegisterError',
    None: 'none',
};

const LoginDialog = (props) => {
    const authService = new AuthService();
    const cookieService = new CookieService();
    const localStorageService = new LocalStorageService();

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertStatus, setAlertStatus] = React.useState(Alerts.None);
    const [isRegisterForm, setIsRegisterForm] = React.useState(false);

    const [userInput, setUserInput] = React.useState('');
    
    const [passwordInput, setPasswordInput] = React.useState('');
    const [isPasswordInputError, setIsPasswordInputError] = React.useState(false);
    
    const [password2Input, setPassword2Input] = React.useState('');
    const [isPassword2InputError, setIsPassword2InputError] = React.useState(false);

    const [emailInput, setEmailInput] = React.useState('');
    const [isEmailInputError, setIsEmailInputError] = React.useState(false);

    const validateInputs = (emailInput, passwordInput, password2Input) => {
        const isEmailError = emailValidator(emailInput);
        setIsEmailInputError(isEmailError);
        const isPasswordError = passwordValidator(passwordInput);
        setIsPasswordInputError(isPasswordError);
        const isPassword2Error = password2Validator(password2Input);
        setIsPassword2InputError(isPassword2Error);
        
        return isEmailError || isPasswordError || isPassword2Error;
    };

    const handleSubmitOnEnter = async (event) => {
        if (event.keyCode !== 13) return;
        event.preventDefault();
        
        if (isRegisterForm) {
            handleRegisterButton();
        } else {
            handleLoginButton();
        }
    };
    
    const handleOpenDialog = () => {
        if (props.isLoggedIn) {
            cookieService.removeToken();
            localStorageService.removeReadNews();
            props.setIsLoggedIn(false);
            setAlertStatus(Alerts.LogoutSuccess);
            openAlert();
        } else {
            setDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setIsRegisterForm(false);
    };

    const handleLoginButton = async () => {
        await authService.getToken(userInput, passwordInput)
            .then((data) => {
                if (!data) throw new Error();
                cookieService.setToken(data.token);
                setAlertStatus(Alerts.LoginSuccess);
                openAlert();
                props.setIsLoggedIn(true);
                const readNews = localStorageService.getReadNews();
                if (readNews) {
                    props.patchProfileReadNews(readNews.split(','));
                }
            }).catch(() => {
                props.setIsLoggedIn(false);
                setAlertStatus(Alerts.LoginError);
                openAlert();
            });
        setDialogOpen(false);
        setIsRegisterForm(false);
    };

    const handleRegisterButton = async () => {
        const isInputError = validateInputs(emailInput, passwordInput, password2Input);
        if(isInputError) return;

        await authService.register(
            userInput,
            passwordInput,
            password2Input,
            emailInput
        ).then((data) => {
            if (!data) throw new Error();
            cookieService.setToken(data.token);
            setAlertStatus(Alerts.RegisterSuccess);
            openAlert();
        }).catch(() => {
            setAlertStatus(Alerts.RegisterError);
            openAlert();
        });
        setDialogOpen(false);
        setIsRegisterForm(false);
    };

    const toggleRegisterForm = () => {
        setIsRegisterForm(!isRegisterForm);
    };

    const openAlert = () => {
        setAlertOpen(true);
    };

    const handleCloseAlert = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertOpen(false);
    };

    const getAlert = (alertStatus) => {
        if (alertStatus === Alerts.LogoutSuccess) {
            return <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
                Successfully logged out.
            </Alert>;
        } else if (alertStatus === Alerts.LoginSuccess) {
            return <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                Successfully logged in!
            </Alert>;
        } else if (alertStatus === Alerts.LoginError) {
            return <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                Login failed.
            </Alert>;
        } else if (alertStatus === Alerts.RegisterSuccess) {
            return <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                Successfully registered!
            </Alert>;
        } else if (alertStatus === Alerts.RegisterError) {
            return <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                Register failed.
            </Alert>;
        }
    };

    return (
        <>
            <Button variant="outlined" onClick={handleOpenDialog} sx={{
                color: 'primary.contrastText'
            }}>
                <Typography variant="h5">
                    {props.isLoggedIn ? 'Logout' : 'Login'}
                </Typography>
            </Button>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{isRegisterForm ? 'Register' : 'Login'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        In order to access new features please {isRegisterForm ? 'register new account.' : 'login with your credentials.'}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Login"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setUserInput(event.target.value)}
                        onKeyDown={(event) => handleSubmitOnEnter(event)}
                    />
                    <TextField style={{ display: isRegisterForm ? 'block' : 'none' }}
                        margin="dense"
                        id="name"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setEmailInput(event.target.value)}
                        error={isEmailInputError}
                        helperText={isEmailInputError ? 'Email is incorrect.' : ''}
                        onKeyDown={(event) => handleSubmitOnEnter(event)}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setPasswordInput(event.target.value)}
                        error={isPasswordInputError}
                        helperText={isPasswordInputError ? 'Password needs to be at least 8 characters long.' : ''}
                        onKeyDown={(event) => handleSubmitOnEnter(event)}
                    />
                    <TextField style={{ display: isRegisterForm ? 'block' : 'none' }}
                        margin="dense"
                        id="name"
                        label="Repeat Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setPassword2Input(event.target.value)}
                        error={isPassword2InputError}
                        helperText={isPassword2InputError ? 'Passwords do not match.' : ''}
                        onKeyDown={(event) => handleSubmitOnEnter(event)}
                    />
                </DialogContent>
                <DialogActions>
                    <Container sx={{paddingLeft: '0'}}>
                        <Typography component="span">
                            {isRegisterForm ? 'Already have an account?' : 'Don\'t have an account?'}
                        </Typography>
                        <Typography 
                            onClick={toggleRegisterForm}
                            component="a"
                            sx={{
                                marginLeft: '8px',
                                color: 'primary.main',
                                textDecoration: 'underline',
                                ':hover': {
                                    color: 'primary.dark'
                                }
                            }}
                        >
                            {isRegisterForm ? 'Login' : 'Register'}
                        </Typography>
                    </Container>
                    
                    <Button sx={{ display: isRegisterForm ? 'block' : 'none', marginRight: '24px' }} onClick={handleRegisterButton}>Register</Button>
                    <Button sx={{ display: isRegisterForm ? 'none' : 'block', marginRight: '12px' }} onClick={handleLoginButton}>Login</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ top: '48px !important' }}
            >
                {getAlert(alertStatus)}
            </Snackbar>
        </>
    );
};

export default LoginDialog;
