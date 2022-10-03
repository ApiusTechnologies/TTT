import React from "react";
import { makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import Tile from "../components/Tile";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "12px",
  },
});

export default function Tiles(props) {
  const classes = useStyles();
  return (
    <div style={{ display: "block" }}>
      <Divider />
      <div className={classes.root}>
        {props.news.map((element, index) => (
          <Tile key={index} news={element} />
        ))}
      </div>
    </div>
  );
}
