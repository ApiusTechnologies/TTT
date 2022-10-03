import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import ApiService from '../services/ApiService';
import Cookies from 'universal-cookie';
import { button } from '../common/styles';

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

    async componentDidMount() {
        const token = this.cookies.get('token');
        if(!token || token === 'undefined'){
            this.setState({ visible: false });
            return;
        } else {
            await this.apiService.getSavedSets()
                .then((data) =>
                    this.setState({ sets: data, checked: this.savedsetIdsToList(data) })
                );
        }
    }

    savedsetIdsToList(data) {
        let array = [];
        data.forEach(element => {
            array.push([element.id, false]);
        });
        return array;

    }

    updateCheckState(data) {
        let checked = this.state.checked;

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < checked.length; j++) {
                if (data[i].id === checked[j][0]) {
                    checked[j][1] = true;
                }
            }
        }
        this.setState({ checked });
    }

    updateCheckInProfile() {
        var checked = this.state.checked;
        var id_array = [];
        checked.forEach((element) => {
            if (element[1] === true) {
                id_array.push(element[0]);
            }
        });
        return id_array;
    }

    handleChange = (event, index) => {
        let localState = this.state.checked;
        localState[index][1] = !localState[index][1];
        this.setState({ checked: localState });
    };

    handleClickOpen = async () => {
        await this.apiService.getAuthenticatedUserProfile()
            .then((data) =>
                this.updateCheckState(data.savedsets)
            );
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = async () => {
        await this.apiService.patchAuthenticatedUserProfile(this.updateCheckInProfile());
        this.setState({ open: false });
    };

    render() {
        return (
            <div style={{ display: this.state.visible ? 'block' : 'none' }}>

                <Button variant="outlined" onClick={this.handleClickOpen} style={button}>
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
                                        key={index}
                                        label={element.name}
                                        control={<Checkbox checked={this.state.checked[index][1]} onChange={(e) => this.handleChange(e, index)} />}
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
