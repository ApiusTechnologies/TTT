import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Tiles from "./Tiles";
import SideBar from "./SideBar";
import ApiService from "../services/ApiService"
import logo from "../graphics/logo.png";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";

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
    minWidth: "30%",
  },
  searchNews: {
    "& > *": {
      width: "100%",
      backgroundColor: "white",
    },

    paddingTop: "1vh",
    paddingBottom: "1vh",
    minWidth: "62%",
  },
  formsContainer: {
    display: "flex",
  },
  mainViewWrapper: {
    backgroundColor: "white",
    width: `calc(100vw - 201px)`,
    paddingLeft: "201px",
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
  },
  arrow: {
    transform: `scale(3.2)`,
    color: "lightgrey",
    paddingTop: "1vh",
    paddingLeft: "18px",
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
    };
    this.handleTagSubmit = this.handleTagSubmit.bind(this);
    this.handleNewsSubmit = this.handleNewsSubmit.bind(this);
    this.getMoreNews = this.getMoreNews.bind(this);

    this.apiService = new ApiService()
  }

  componentDidMount() {
    this.apiService.getNews({limit:16}).then((data) =>
      this.setState({ news: data.results || [] , next: data.next})
    );
    this.apiService.getTags().then((data) =>
      this.setState({ tags: data || [] })
    );
  }

  validateInput(data){
    return data.replace("&", "%26")
  }

  handleNewsSubmit(event) {
    const input = this.validateInput(event.target.value)
    this.apiService.getNews('',{ title: input }).then((data) =>
      this.setState({ news: data || [] })
    );
  }

  handleTagSubmit(event) {
    const input = this.validateInput(event.target.value)
    this.apiService.getTags({ name: input }).then((data) =>
      this.setState({ tags: data || [] })
    );
  }

  getMoreNews(event) {
    this.apiService.getNews({limit:16, offset: this.state.next.split('offset=')[1]}).then((data) =>
      this.setState(prevState => ({
        news: [...prevState.news, ...data.results], next: data.next
      }))
    );
    console.log(this.state.news)
    
  }

  render() {
    const { classes } = this.props;

    return ( 
      <div>
        <div className={classes.banner}>
          <div className={classes.logoContainer}>
            <img className={classes.logo} src={logo} alt="Logo"/>
            <div className={classes.logoText}>Threat Trends Tracker</div>
          </div>
        </div>
        <div className={classes.mainViewWrapper}>
          <div className={classes.formsContainer}>
            <form className={classes.searchTags} noValidate autoComplete="off">
              <TextField
                onChange={this.handleTagSubmit}
                id="outlined-basic"
                label="Search Tags"
                variant="outlined"
              />
            </form>
            <form className={classes.searchNews} noValidate autoComplete="off">
              <TextField
                onChange={this.handleNewsSubmit}
                id="outlined-basic"
                label="Search News"
                variant="outlined"
              />
            </form>
            
            <ArrowDownwardSharpIcon onClick={this.getMoreNews} className={classes.arrow}></ArrowDownwardSharpIcon>
          </div>
          <div>
            <SideBar tags={this.state.tags} />
            <Tiles news={this.state.news} />
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(MainView);
