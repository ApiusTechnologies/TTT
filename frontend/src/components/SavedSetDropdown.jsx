import React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import ApiService from "../services/ApiService";
import Cookies from 'universal-cookie';

class SavedSetDropdown extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            select: "",
            savedsets: [],
            visible: true
        }
        this.handleSavedSetChange = this.handleSavedSetChange.bind(this)

        this.apiService = new ApiService();
        this.cookies = new Cookies();

    }

    componentDidMount() {
        localStorage.setItem('SavedSetSelect', "")
        this.apiService.getUserProfile({}, {
            headers: {
              Authorization: 'Token ' + this.cookies.get('token') 
            }
           }).then((data) =>
            this.setState({ savedsets: data.savedsets })
          );
          if(!this.cookies.get('token')) {
            this.setState({visible: false})
          }
    }

    handleSavedSetChange(event) {
      let searchTerms = ""
      console.log(this.state.savedsets)
      this.state.savedsets.forEach( (element) => element.name === event.target.value ? searchTerms = element.keywords : function(){})
      let searchString = ''
      searchTerms.forEach( (element) => searchString += element.value+',')
      localStorage.setItem('SavedSetSelect', searchString.slice(0, -1))
    }

    render(){
        return (
            <Box style={{display: this.state.visible ? "block" : "none", paddingTop: "10px"}}>
              <FormControl fullWidth>
                <InputLabel id="savedset-select-label">Select Saved Set</InputLabel>
                <Select
                  labelId="savedset-select-label"
                  id="savedset-select"
                  value={this.state.select}
                  label="Select Saved Set"
                  onChange={this.handleSavedSetChange}
                >
                    {this.state.savedsets.map((element, index) => ( 
                        <MenuItem value={element.name}>{element.name}</MenuItem>
                ))}
                  
                </Select>
              </FormControl>
            </Box>
        )
    }
}
export default SavedSetDropdown;