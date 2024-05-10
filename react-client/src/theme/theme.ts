// NOTE: For future customizations
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // The `root` key targets the base style of the button
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
          '&:hover': {
            background: 'linear-gradient(45deg, #FE6B8B 50%, #FF8E53 95%)'
          }
        }
      }
    }
  }
});

export default theme;
