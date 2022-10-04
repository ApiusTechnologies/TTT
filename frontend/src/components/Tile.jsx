import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import { Box } from '@mui/material';
import {decodeHtmlCharCodes} from '../common/utils';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        minWidth: 400,
        margin: '10px 10px 10px 10px',
    },
    content: {
        minHeight: 145,
    },
    source: {
        marginBottom: '12px',
        border: '1px solid grey',
        fontSize: 30,
        color: 'white',
    },
});


export default function Tile(props) {
    const classes = useStyles(props);

    return (
        <div >
            <Grow in={true} timeout={1500} >
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Box className={classes.source} sx={{
                            backgroundColor: props.news?.source?.includes('@') ? '#1DA1F2' : 'black',
                        }}>
                            <Typography variant="h4">
                                {props.news.source}
                            </Typography>
                        </Box>
                        <div className={classes.content}>
                            <Typography
                                variant="h5"
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                            >
                                {props.news.title}
                            </Typography>
                            <Typography
                                className={classes.summary}
                                variant="body1"
                            >
                                {props.news.summary ? decodeHtmlCharCodes(props.news.summary.split('<')[0]) : 'No summary'}
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
