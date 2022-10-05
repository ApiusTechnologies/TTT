import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import ApiService from '../services/ApiService';
import Cookies from 'universal-cookie';
import { Typography } from '@mui/material';

const PresetDialog = (props) => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [presets, setPresets] = React.useState([]);

    const cookies = new Cookies();
    const apiService = new ApiService();

    React.useEffect(() => {
        const fetchData = async () => {
            await apiService.getPresets()
                .then((data) => {
                    if (!data) return;
                    setPresets(data.map(preset => ({...preset, selected: false})));
                });
        };
        fetchData();
    }, []);

    const togglePresetSelection = (id) => {
        setPresets(presets.map(preset => String(preset.id) === String(id) ? 
            {...preset, selected: !preset.selected} : 
            preset));
    };

    const handleOpenDialogButton = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSubmit = async () => {
        const token = cookies.get('token');
        const selectedPresets = presets.filter((preset) => Boolean(preset.selected));
        if (!token || token === 'undefined') {
            props.setSelectedPresets(selectedPresets);
        } else {
            await apiService.patchAuthenticatedUserProfile(
                selectedPresets.map((preset) => preset.id)
            );
            props.setSelectedPresets(selectedPresets);
        }
        handleCloseDialog();
    };

    return (
        <Box>
            <Button variant="outlined" onClick={handleOpenDialogButton} sx={{
                color: 'primary.contrastText'
            }}>
                <Typography variant="h5">
                    PRESETS
                </Typography>

            </Button>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Presets</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here are source presets defined by administrator for you tu use.
                    </DialogContentText>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                        {presets.map((element) => (
                            <FormControlLabel
                                key={element.id}
                                label={element.name}
                                value={element.id}
                                control={
                                    <Checkbox 
                                        checked={presets.find(preset => preset.id === element.id)?.selected} 
                                        onChange={(event) => togglePresetSelection(event.target.value)} />
                                }
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSubmit()}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default PresetDialog;
