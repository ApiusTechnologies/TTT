import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    minWidth: 400,
    margin: "10px 10px 10px 10px",
  },
  content: {
    minHeight: 145,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
    fontFamily: "Chakra Petch",
  },
  summary: {
    fontSize: 12,
    textAlign: "left",
    fontFamily: "Chakra Petch",
  },
  source: {
    marginBottom: "12px",
    border: "1px solid grey",
    fontFamily: "Codystar",
    fontSize: 30,
    backgroundColor: "black",
    color: "white",
  },
});

export default function Tile(props) {
  const classes = useStyles();

  return (
    <div >
      <Grow in={true}  timeout={1500} >
        <Card className={classes.root} variant="outlined">
          
          <CardContent>
            <div className={classes.source}>{props.news.source}</div>

            <div className={classes.content}>
              <Typography
                variant="h5"
                component="h2"
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {props.news.title}
              </Typography>
              <Typography
                className={classes.summary}
                variant="h5"
                component="h2"
              >
                {props.news.summary.split("<")[0]}
              </Typography>
            </div>
          </CardContent>

          <CardActions>
            <Button href={props.news.href} size="small">
              LEARN MORE
            </Button>
          </CardActions>
        </Card>
      </Grow>
    </div>
  );
}
