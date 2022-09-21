import React from "react";
import Button from "@material-ui/core/Button";
import Checkbox from '@mui/material/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import ApiService from "../services/ApiService";
import Cookies from 'universal-cookie';

class SavedSetDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            checked: [],
            sets: [],
            visible: true
        };
        this.cookies = new Cookies();
        this.apiService = new ApiService();
    }
  

  

    componentDidMount() {
        this.apiService.getSavedSet({}, {
            headers: {
            Authorization: 'Token ' + this.cookies.get('token') 
            }
        }).then((data) =>
            this.setState({ sets: data, checked: new Array(data.length).fill(false) })
        );
        if(!this.cookies.get('token')) {
          this.setState({visible: false})
        }
    }

    handleChange = (event, index) => {
        let localState = this.state.checked
        localState[index] = !localState[index]
        this.setState({ checked : localState })
    };
    
    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    handleSubmit = () => {
        this.setState({ open: false })
    };

  

  render() {
    return (
        <div style={{display: this.state.visible ? "block" : "none"}}>
          
          <Button variant="outlined" onClick={this.handleClickOpen} style={{marginTop: "-15px", fontFamily: "Bebas Neue", fontSize: "20px", width: "100%", borderRadius: "0", backgroundColor: "#2b2b69", color: "white"}}>
            Saved Sets
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Saved Sets</DialogTitle>
    
            
            <DialogContent>
              <DialogContentText>
                Here are Saved Sets defined by administrator for you tu use.
              </DialogContentText>
              <div>
              <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                {this.state.sets.map((element, index) => ( 
                    <FormControlLabel
                    label={element.name}
                    control={<Checkbox checked={this.state.checked[index]} onChange={ (e) => this.handleChange(e, index) }/>}
                />
                ))}
                </Box>
            </div>
            </DialogContent>
            <DialogActions>
                
              <Button onClick={this.handleSubmit}>Submit</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
  }
  
}
export default SavedSetDialog;