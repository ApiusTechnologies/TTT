import * as React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Tile from './Tile';
import { Container } from '@mui/system';
import GppBadIcon from '@mui/icons-material/GppBad';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const Tiles = (props) => {
    return (
        <>
            <Toolbar />
            <Toolbar />
            <Toolbar />
            {props.news?.length > 0 && <>
                <Grid container spacing={1} sx={{
                    padding: '16px',
                    paddingBottom: '48px'
                }}>
                    {props.newNews.map((element, index) => (
                        <Grid key={index} item xs={12} md={3}>
                            <Tile news={element} handleClick={() => props.handleReadMoreClick(element.id)} wasRead={props.readNews?.has(element.id.toString())} />
                        </Grid>
                    ))}
                </Grid>
                <Divider />
            </>}
            <Grid container spacing={1} sx={{
                padding: '16px',
                paddingBottom: '48px'
            }}>
                {props.news.length === 0 && !props.isFetchingNews && (
                    <Container sx={{padding: '48px 0 48px 0'}}>
                        <GppBadIcon fontSize="large" sx={{width: '100%', margin: 'auto'}}/>
                        <Typography sx={{textAlign: 'center'}}>No news to show :(</Typography>
                    </Container>
                )}
                {props.news?.map((element, index) => (
                    <Grid key={index} item xs={12} md={3}>
                        <Tile news={element} handleClick={() => props.handleReadMoreClick(element.id)} wasRead={props.readNews?.has(element.id.toString())} />
                    </Grid>  
                ))}
                {props.isFetchingNews && <Container sx={{display: 'flex', justifyContent: 'center', marginTop: '48px'}}>
                    <CircularProgress color="primary"/>
                </Container>}
            </Grid>
            {props.news.length !== 0 && !props.nextNewsUrl && (
                <Container sx={{padding: '12px 0 48px 0'}}>
                    <GppGoodIcon fontSize="large" sx={{width: '100%', margin: 'auto'}}/>
                    <Typography sx={{textAlign: 'center'}}>No more news for this topic</Typography>
                </Container>
            )}
            {props.isFetchingNewsError && 
        <Container sx={{padding: '12px 0 48px 0'}}>
            <ReportGmailerrorredIcon fontSize="large" sx={{width: '100%', margin: 'auto'}}/>
            <Typography sx={{textAlign: 'center'}}>Failed to fetch news :(</Typography>
        </Container>}
        </>
    );
};

export default Tiles;
