import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ApiService from '../services/ApiService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    
  }));

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

const CustomPresets = (props) => {
    const [open, setOpen] = React.useState(false);
    // const [presets, setPresets] = React.useState([]);
    const [clickedPreset, setClickedPreset] = React.useState(false);


    // const apiService = new ApiService();
    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         await apiService.getPresets()
    //             .then((data) => {
    //                 if (!data) return;
    //                 setPresets(data.map(preset => ({...preset, selected: false})));
    //             });
    //     };
    //     fetchData();
    // }, []);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(props.customPresets)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handlePresetClick = (event) => {
      console.log(event)
    };
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Custom Presets
            </Button>
            <BootstrapDialog 
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Custom Presets
                </BootstrapDialogTitle>
                <DialogContent dividers>
                <div style={{display: "flex"}} >
                <Box sx={{ width: '60%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    
                    <nav aria-label="secondary mailbox folders">
                        <List>
                        {props.customPresets.map((element) => (
                            <>
                            <ListItem key={element.name} disablePadding>
                                <ListItemButton onClick={handlePresetClick(element.name)}>
                                    <ListItemText primary={element.name}/>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            </>
                        ))}
                        
                        </List>
                    </nav>
                </Box>
                <div style={{width: "300px"}}>
                    DUPA
                </div>
                </div>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Save changes
                </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default CustomPresets;
