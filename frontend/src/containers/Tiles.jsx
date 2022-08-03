import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
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
        {props.news.map((element) => (
          <Tile news={element} />
        ))}
      </div>
    </div>
  );
}
