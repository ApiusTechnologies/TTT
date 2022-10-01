import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Tiles from "./Tiles";
import SideBar from "./SideBar";
import ApiService from "../services/ApiService"
import logo from "../graphics/logo.png";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Cookies from 'universal-cookie';
import IconButton from "@material-ui/core/IconButton";

const useStyles = () => ({
  searchTags: {
    "& > *": {
      width: "100%",
      backgroundColor: "white",
    },
    marginLeft: "22px",
    marginRight: "15px",
    paddingTop: "1vh",
    paddingBottom: "1vh",
    minWidth: "17%",
  },
  searchNews: {
    "& > *": {
      width: "100%",
      backgroundColor: "white",
    },
    
    paddingTop: "1vh",
    paddingBottom: "1vh",
    minWidth: "58%",
  },
  formsContainer: {
    display: "flex",
    backgroundColor: "white",
  },
  mainViewWrapper: {
    backgroundColor: "white",
    width: `calc(100vw - 201px)`,
    paddingLeft: "201px",
    paddingTop: "10vh",
  },
  logo: {
    height: "3vh",
    display: "inline-block",
    
  },
  logoContainer: {
    textAlign: "center",
    height: "100%",
  },
  logoText: {
    display: "inline-block",
    paddingLeft: "10px",
    fontFamily: "Bebas Neue",
  },
  banner: {
    width: "100%",
    height: "4vh",
    backgroundColor: "#2b2b69",
    // position: "fixed",
  },
  arrow: {
    transform: `scale(3.2)`,
    color: "lightgrey",
  },
  button: {
    color: "lightgrey",
    marginLeft: "28px",
    borderRadius: "0",
    width: "70px",
  },
  selectSource: {
    paddingTop: "1vh",
    paddingLeft: "10px",
    minWidth: "15%",
  },
  navbar: {
    position: "fixed",
    paddingLeft: "205px",
    width: `calc(100vw - 201px)`,
    zIndex: "4",

  }
});


class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      tags: [],
      tagsSearch: "",
      newsSearch: "",
      next: "",
      source: "",
      savedset: "",
    };
    this.handleTagSubmit = this.handleTagSubmit.bind(this);
    this.handleNewsSubmit = this.handleNewsSubmit.bind(this);
    this.getMoreNews = this.getMoreNews.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleTagOnClick = this.handleTagOnClick.bind(this);

    this.apiService = new ApiService()
    this.cookies = new Cookies();
  }

  componentDidMount() {
    this.apiService.getNews({limit:16}).then((data) =>
      this.setState({ news: data.results || [] , next: data.next, source: this.state.source})
    );
    this.apiService.getTags().then((data) =>
      this.setState({ tags: data || [] })
    );
    
  }

  handleSourceChange(event) {
    this.setState({ source: event.target.value})
  }

  handleNewsSubmit(event) {
    if(event.keyCode === 13) {
      event.preventDefault()
      const savedSet = localStorage.getItem('SavedSetSelect')
      const inputValue = event.target.value
      this.apiService.getNews({ 
        limit:16, 
        summary: [savedSet, inputValue].filter(Boolean).join(","), 
        source: this.state.source, 
        tags: this.state.tagsSearch 
      }).then((data) =>
        this.setState({ news: data.results || [], next: data.next })
      );
      this.setState({newsSearch: input})
    }
  }

  handleTagOnClick(index, text) {
    this.apiService.getNews({ 
      limit:16, 
      tags: text, 
      summary: this.state.newsSearch, 
      source: this.state.source 
    }).then((data) =>
      this.setState({ news: data.results || [], next: data.next })
    );
    this.setState({tagsSearch: text})

  }

  handleTagSubmit(event) {
    if(event.keyCode === 13) {
      event.preventDefault()
      const input = this.validateInput(event.target.value)
      this.apiService.getTags({ name: input }).then((data) =>
        this.setState({ tags: data || [] })
      );
    }
  }

  getMoreNews(event) {
    if(this.state.next) {
        this.apiService.getNews({
          limit:16, 
          offset: this.state.next.split('offset=')[1].split('&')[0], 
          summary: this.state.newsSearch, 
          source: this.state.source, 
          tags: this.state.tagsSearch
        }).then((data) =>
          this.setState(prevState => ({
            news: [...prevState.news, ...data.results], next: data.next
          }))
        );
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        })
      }
      else {
        alert("No more entries with given filters.")
      }
    }
      


  render() {
    const { classes } = this.props;

    return ( 
      <div>
        <div className={classes.navbar}>
        <div className={classes.banner}>

          <div className={classes.logoContainer}>
            <img className={classes.logo} src={logo} alt="Logo" onClick={() => alert(`Treść: ${this.state.newsSearch}\nTagi: ${this.state.tagsSearch}\nŹródło: ${this.state.source}`)}/>
            <div className={classes.logoText}>Threat Trends Tracker</div>
            
          </div>
        </div>
        <div className={classes.formsContainer}>
            <form className={classes.searchTags} noValidate autoComplete="off">
              <TextField
                onKeyDown={this.handleTagSubmit}
                id="outlined-basic"
                label="Search Tags"
                variant="outlined"
              />
            </form>
            <form className={classes.searchNews} noValidate autoComplete="off">
              <TextField
                onKeyDown={this.handleNewsSubmit}
                id="outlined-basic"
                label="Search News"
                variant="outlined"
              />
            </form>
            <Box className={classes.selectSource}>
              <FormControl fullWidth>
                <InputLabel id="source-select-label">Select Source</InputLabel>
                <Select
                  labelId="source-select-label"
                  id="source-select"
                  value={this.state.source}
                  label="Select Source"
                  onChange={this.handleSourceChange}
                >
                  <MenuItem value={""}>All</MenuItem>
                  <MenuItem value={"Sekurak"}>Sekurak</MenuItem>
                  <MenuItem value={"@"}>Twitter</MenuItem>
                  <MenuItem value={"Niebezpiecznik"}>Niebezpiecznik</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <IconButton className={classes.button}>
              <ArrowDownwardSharpIcon onClick={this.getMoreNews} className={classes.arrow}></ArrowDownwardSharpIcon>
            </IconButton>
          </div>
        </div>

        <div className={classes.mainViewWrapper}>
          
          <div>
            <SideBar onClickFunc={this.handleTagOnClick} tags={this.state.tags} />
            <Tiles news={this.state.news} />
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(MainView);
