import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const SideDrawer = (props) => {
    const { window } = props;

    const drawer = (props) => (
        <div>
            <Toolbar sx={{
                backgroundColor: 'primary.main',
                boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
            }} />
            <Divider />
            {props.isFetchingTags ?
                <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
                    <CircularProgress color="primary" />
                </Container> :
                props.isFetchingTagsError ?
                    <Container sx={{ padding: '12px 0 48px 0' }}>
                        <ReportGmailerrorredIcon fontSize="large" sx={{ width: '100%', margin: 'auto' }} />
                        <Typography sx={{ textAlign: 'center' }}>Failed to fetch tags :(</Typography>
                    </Container>
                    :
                    <List>
                        <ListItemButton selected={!props.tagsFilter} onClick={() => props.handleTagOnClick('')}>
                            <ListItemText primary={'All'} />
                        </ListItemButton>
                        {props.tags?.map(({ _, name, count }, index) => (
                            <ListItemButton key={index} selected={props.tagsFilter === name} onClick={() => props.handleTagOnClick(name)} >
                                <ListItemText primary={name} secondary={`(${count})`} sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }} />
                            </ListItemButton>
                        ))}
                    </List>}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                container={container}
                variant="temporary"
                open={props.mobileDrawerOpen}
                onClose={props.handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', width: props.drawerWidth
                    },
                }}
            >
                {drawer(props)}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', width: props.drawerWidth
                    },
                }}
                open
            >
                {drawer(props)}
            </Drawer>
        </Box>
    );
};

export default SideDrawer;
