import React from 'react';
import Snackbar from '@mui/material/Snackbar';


const NotificationWrapper = (props) => {
    const handleCloseAlert = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setAlertOpen(false);
    };

    return (
        <Snackbar
            open={props.alertOpen}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ top: '48px !important' }}
        >
            {props.children}
        </Snackbar>
    );
};

export default NotificationWrapper;
