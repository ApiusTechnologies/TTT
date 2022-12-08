import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import ApiService from '../services/ApiService';
import { Typography } from '@mui/material';
import CookieService from '../services/CookieService';

const PresetDialog = (props) => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [presets, setPresets] = React.useState([]);
    
    const cookieService = new CookieService();
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

    const returnPresetContentType = () => {
        var contentTypes = new Set()
        presets.map(preset => (contentTypes.add(preset.content_type)))
        return Array.from(contentTypes)
    };

    const togglePresetSelection = (id) => {
        setPresets(presets.map(preset => String(preset.id) === String(id) ? 
            {...preset, selected: !preset.selected} : 
            preset));
    };

    const handleOpenDialogButton = () => {
        setIsDialogOpen(true);
        returnPresetContentType();
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSubmit = async () => {
        const token = cookieService.getToken();
        const selectedPresets = presets.filter((preset) => Boolean(preset.selected));
        if (!token) {
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
                    <DialogContentText sx={{ marginBottom: '15px' }} >
                        Here are source presets defined by administrator for you tu use.
                    </DialogContentText>
                    {returnPresetContentType().map((cType) =>(
                        <Box key={cType} sx={{ paddingBottom: '10px', display: 'flex', flexDirection: 'column', ml: 3 }}>
                            <Typography sx={{ fontSize: "18px"}}>
                                {cType}
                            </Typography>
                            {presets.map((element) => (
                            String(cType) == element.content_type ?                       
                            (<FormControlLabel sx={{ marginTop: '-10px', marginBottom: '-10px', paddingLeft: '25px' }}
                                key={element.id}
                                label={element.name}
                                value={element.id}
                                control={
                                    <Checkbox sx={{ scale: '0.5' }}
                                        checked={presets.find(preset => preset.id === element.id)?.selected} 
                                        onChange={(event) => togglePresetSelection(event.target.value)} />
                                }
                            />) : null
                        ))}
                        <Divider sx={{ marginTop: '10px' }} />

                        </Box>
                    ))}
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSubmit()}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default PresetDialog;
