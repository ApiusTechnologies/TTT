import React from "react";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import LoginDialog from "../components/LoginDialog";
import SavedSetDropdown from "../components/SavedSetDropdown";
import SavedSetsDialog from "../components/SavedSetsDialog";
import { Typography } from "@mui/material";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    textTransform: "capitalize",
    color: "red",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: {
    minHeight: "75px",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  searchTags: {
    "& > *": {
      margin: theme.spacing(1),
      width: "160px",
    },
  }
}));

function SideBar(props) {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      
      <LoginDialog/>
      <SavedSetsDialog />
      <SavedSetDropdown />

      <div className={classes.toolbar} />
      <Divider />
      <List >
        {props.tags
          .map((o) => o.name)
          .map((text, index) => (
            <div key={index}>
              <ListItem button onClick={() => props.onClickFunc(index, text)} >
                <Typography variant="body2">
                  {text}
                </Typography>
              </ListItem>
              <Divider />
            </div>
          ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
