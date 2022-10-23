import * as React from 'react';
import Card from '@mui/material/Card';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {decodeHtmlCharCodes} from '../common/utils';

const Tile = (props) => {
    return ( 
        <Grow in={true} timeout={1500} >
            <Card variant="outlined" sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: props.wasRead ? '#D1D1D1 ' : 'white',
            }}>
                <CardContent sx={{textAlign: 'center'}}>
                    <Box sx={{
                        backgroundColor: props.news?.source?.startsWith('@') ? '#1DA1F2' : 'black',
                    }}>
                        <Typography
                            variant="h4"
                            color="primary.contrastText">
                            {props.news.source}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="h5"
                            color="textSecondary"
                            gutterBottom>
                            {props.news.title}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body1">
                            {props.news.summary ? decodeHtmlCharCodes(props.news.summary.split('<')[0]) : 'No summary'}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button onClick={props.handleClick} rel="noopener noreferrer" target="_blank" href={props.news.href} size="small">
              LEARN MORE
                    </Button>
                    <Typography sx={{marginLeft: 'auto', marginRight: 2}}
                        variant="h8"
                        color="textSecondary">
                        {props.news.date.replace('T', ' ').replace('Z','')}
                    </Typography>
                </CardActions>
            </Card>
        </Grow>
    );
};

export default Tile;
