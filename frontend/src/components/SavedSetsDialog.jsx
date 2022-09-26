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
            this.setState({ sets: data, checked: this.savedsetIdsToList(data) })
            // this.savedsetIdsToList(data)
        );
        if(!this.cookies.get('token')) {
          this.setState({visible: false})
        }
        
    }

    savedsetIdsToList(data) {
      let array = []
      data.forEach(element => { array.push([element.id, false])
      });
      return array

    }

    updateCheckState(data){
      let checked = this.state.checked

      for (let i=0; i<data.length; i++){
        for (let j=0; j<checked.length; j++){
          if(data[i].id===checked[j][0]){
            checked[j][1] = true
          }
        }
      }
      this.setState({ checked: checked })
    }

    updateCheckInProfile() {
      var checked = this.state.checked
      var id_array = []
      checked.forEach((element) => {
        if(element[1] === true){
          id_array.push(element[0])
        }
      })
      return id_array
    }

    handleChange = (event, index) => {
        let localState = this.state.checked
        localState[index][1] = !localState[index][1]
        this.setState({ checked : localState })
    };
    
    handleClickOpen = () => {
      console.log(this.state.checked)
      this.apiService.getAuthenticatedUserProfile({}, {
        headers: {
          Authorization: 'Token ' + this.cookies.get('token') 
        }
       }).then((data) =>
          this.updateCheckState(data.savedsets)
      );
      this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    handleSubmit = () => {
        this.apiService.patchAuthenticatedUserProfile({}, {
          headers: {
          Authorization: 'Token ' + this.cookies.get('token') 
          }
      }, { savedsets: this.updateCheckInProfile() })
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
                    control={<Checkbox checked={this.state.checked[index][1]} onChange={ (e) => this.handleChange(e, index) }/>}
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