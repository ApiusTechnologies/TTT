import React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import ApiService from "../services/ApiService";
import Cookies from 'universal-cookie';

class SavedSetDropdown extends React.Component {

  constructor(props) {
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
    this.apiService.getAuthenticatedUserProfile({}, {
      headers: {
        Authorization: 'Token ' + this.cookies.get('token')
      }
    }).then((data) =>
      this.setState({ savedsets: data.savedsets })
    );
    if (!this.cookies.get('token') || this.cookies.get('token') === 'undefined') {
      this.setState({ visible: false })
    }
  }

  handleSavedSetChange(event) {
    const savedSet = this.state.savedsets.find((element) => element.name === event.target.value)
    const searchTerms = savedSet?.keywords
    const searchString = searchTerms.map((element) => element.value).join(",")
    localStorage.setItem('SavedSetSelect', searchString.slice(0, -1))
    this.setState({ select: event.target.value })
  }

  render() {
    return (
      <Box style={{ display: this.state.visible ? "block" : "none", paddingTop: "10px" }}>
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
