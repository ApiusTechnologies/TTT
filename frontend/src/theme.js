import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Roboto"',
            '"Oxygen"',
            '"Ubuntu"',
            '"Cantarell"',
            '"Fira Sans"',
            '"Droid Sans"',
            '"Helvetica Neue"',
        ],
        fontSize: 16,
        fontWeightRegular: 400,
        fontWeightBold: 700,
        color: 'rgb(0,0,0,0.87)',
        h1: {
            fontFamily: 'Bebas Neue',
            fontSize: '5rem',
            fontWeight: 400,
        },
        h2: {
            fontFamily: 'Bebas Neue',
            fontSize: '4rem',
            fontWeight: 400,
        },
        h3: {
            fontFamily: 'Bebas Neue',
            fontSize: '3rem',
            fontWeight: 400,
        },
        h4: {
            fontFamily: 'Bebas Neue',
            fontSize: '2rem',
            fontWeight: 400,
        },
        h5: {
            fontFamily: 'Bebas Neue',
            fontSize: '1.5rem',
            fontWeight: 400,
        },
        body1: {
            fontFamily: 'Chakra Petch',
            color: 'inherit',
            fontSize: '1rem',
            fontWeight: 200,
            textAlign: 'left'
        },
        body2: {
            fontFamily: 'Chakra Petch',
            color: 'rgba(0, 0, 0, 0.35)',
            fontSize: '1rem',
            fontWeight: 200,
            textAlign: 'left'
        },
    },
    palette: {
        primary: {
            light: '#5a5498',
            main: '#2b2b69',
            dark: '#00013e',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ffffff',
            main: '#f5f5f5',
            dark: '#c2c2c2',
            contrastText: '#000000',
        },
        background: {
            default: '#f5f5f5'
        }
    },
    components: {
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: 'rgb(0,0,0,0.35)',
                },
            }
        },
    }
});
