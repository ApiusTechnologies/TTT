import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Searchbar = (props) =>  {
    return (
        <Box
            sx={{ 
                position: 'fixed',
                flexGrow: 1, 
                p: 3, 
                background: 'white',
                borderBottom: '1px solid',
                borderBottomColor: 'background.default',
                borderBottomLeftRadius: '5pt',
                borderBottomRightRadius: '5pt',
                boxShadow:'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
                zIndex: '1',
                width: { sm: `calc(100% - ${props.drawerWidth}px)` } }}
        >
            <Toolbar />
            <Grid container spacing={{ xs: 0, md: 3 }}>
                <Grid item xs={12} md>
                    <TextField
                        fullWidth
                        sx={{m:1}}
                        onKeyDown={props.handleTagSubmit}
                        id="outlined-basic"
                        label="Search Tags"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        sx={{m:1 }}
                        onKeyDown={props.handleNewsSubmit}
                        id="outlined-basic"
                        label="Search News"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md>
                    <FormControl fullWidth sx={{m:1}}>
                        <InputLabel id="source-select-label">Select Source</InputLabel>
                        <Select
                            labelId="source-select-label"
                            id="source-select"
                            value={props.sourceFilter}
                            label="Select Source"
                            onChange={props.handleSourceChange}
                        >
                            <MenuItem value={''}>All</MenuItem>
                            <MenuItem value={'Sekurak'}>Sekurak</MenuItem>
                            <MenuItem value={'@'}>Twitter</MenuItem>
                            <MenuItem value={'Niebezpiecznik'}>Niebezpiecznik</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid sx={{display: props.isLoggedIn ? 'block' : 'none'}} item xs={12} md>
                    <FormControl fullWidth sx={{m:1}}>
                        <InputLabel id="cp-select-label">Custom Preset</InputLabel>
                        <Select
                            labelId="cp-select-label"
                            id="cp-select"
                            value={props.selectedCustomPreset}
                            label="Select Custom Preset"
                            onChange={props.handleCustomPresetChange}
                        >
                            <MenuItem sx={{ color: 'green' }} value=''>
                                Not Selected
                            </MenuItem>
                            {props.customPresets.map((custom_preset, index) => (
                                <MenuItem key={index} value={custom_preset}>
                                    {custom_preset.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <div style={{ display: 'flex'}}>
            {props.selectedPresets.length > 0 && 
            <Typography variant='body2' sx={{marginBottom: '-16px'}}>
                Selected Global Presets: {props.selectedPresets.map(preset => preset.name).join(', ')}
            </Typography>}
            {props.selectedCustomPreset.length > 0 && 
            <Typography variant='body2' sx={{marginBottom: '-16px', marginLeft: 'auto'}}>
                    Selected Custom Preset: {props.selectedCustomPreset}
            </Typography>}

            </div>


        </Box>
    );
};

export default Searchbar;
