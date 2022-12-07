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
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import ApiService from '../services/ApiService';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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
    const apiService = new ApiService();

    const [open, setOpen] = React.useState(false);
    const [clickedPresetQuery, setClickedPresetQuery] = React.useState('');
    const [clickedPresetName, setClickedPresetName] = React.useState('');

    const [selectedPresetId, setSelectedPresetId] = React.useState();
    const [customPresets, setCustomPresets] = React.useState(props.customPresets);

 
    
    const handleClickOpen = () => {
        setOpen(true);
        setCustomPresets(props.customPresets)
        console.log(customPresets)
    };

    const handleClose = () => {
        patchProfileCustomPresets(customPresets)
        // props.setCustomPresets(customPresets)
        console.log(customPresets)
        setOpen(false);
    };

    const handleCreate = () => {
      createNewCustomPreset()
    }

    const handleDelete = (id) => {
      deleteCustomPreset(id)
    }

    const handleChangeQuery = (e) =>{
        customPresets.filter((item) => {
          if(item.id == selectedPresetId){
            item.query = e.target.value
          }
        });
        setCustomPresets(customPresets)
    };

    const handleChangeName = (e) =>{
      customPresets.filter((item) => {
        if(item.id == selectedPresetId){
          item.name = e.target.value
        }
      });
      setCustomPresets(customPresets)
  };

    const customPresetsQueryByIndex = (index) => {
      var idx = props.customPresets.map(object => object.id).indexOf(index);
      return props.customPresets[idx].query
    };

    const customPresetsNameByIndex = (index) => {
      var idx = props.customPresets.map(object => object.id).indexOf(index);
      console.log(props.customPresets[idx].name)
      return props.customPresets[idx].name
    };

    const handlePresetClick = (event) => {
      setClickedPresetQuery(customPresetsQueryByIndex(event))
      setClickedPresetName(customPresetsNameByIndex(event))
      setSelectedPresetId(event)
    };

    const patchProfileCustomPresets = async (customPresets) => {
      await apiService.patchAuthenticatedUserProfile(undefined, undefined, [...customPresets]);
  };

    const createNewCustomPreset = async () => {
      await apiService.postAuthenticatedCustomPresets();
    };

    const deleteCustomPreset = async (deleteId) => {
      await apiService.postAuthenticatedCustomPresets(deleteId)
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} sx={{
                color: 'primary.contrastText',
                display: props.isLoggedIn ? 'block' : 'none',
            }}>
                <Typography variant="h5">
                  Custom Presets
                </Typography>

            </Button>
            <BootstrapDialog 
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                  <Typography variant="h5">
                    Custom Presets
                  </Typography>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                <div style={{ display: 'flex'}} >
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    
                    <nav aria-label="secondary mailbox folders">
                        <List>
                        {customPresets.map((element) => (
                            <>
                            <div style={{display: 'flex'}}>
                              <ListItem key={element.name} disablePadding>
                                  <ListItemButton onClick={() => handlePresetClick(element.id)}>
                                      <ListItemText primary={element.name}/>
                                  </ListItemButton>
                              </ListItem>
                              <Button onClick={() => handleDelete(element.id)}> 
                                <RemoveCircleIcon style={{ color: 'red', scale: '0.75' }}/>
                              </Button>
                            </div>
                            
                            <Divider />
                            </>
                        ))}
                        
                        </List>
                    </nav>
                </Box>
                <div style={{width: "100%", paddingTop: "15px", paddingLeft: "10px"}}>
                    <TextField
                      style={{ paddingBottom: "10px", width: "100%" }}
                      id="outlined-multiline-static"
                      label="Name"
                      multiline
                      rows={1}
                      defaultValue={clickedPresetName}
                      onChange={handleChangeName}
                    />
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-multiline-static"
                      label="Query"
                      multiline
                      rows={6}
                      defaultValue={clickedPresetQuery}
                      onChange={handleChangeQuery}
                    />
                </div>
                </div>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleCreate}>
                    Create
                </Button>
                <Button autoFocus onClick={handleClose}>
                    Save changes
                </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default CustomPresets;
