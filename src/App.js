import React from 'react';
import { AppBar, Box, Container, Paper, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CameraIcon from '@mui/icons-material/PhotoCamera';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper>
          <AppBar position="static" sx={{ m: 2, ml: 0, p: 2, bgcolor: 'secondary' }}>
            <Toolbar>
              <CameraIcon sx={{ mr: 2 }} />
              <Typography variant="h3">Rate my Brat!</Typography>
              <Typography sx={{ p: 3 }} variant="h6">Welcome to Octoberfest</Typography>
            </Toolbar>

          </AppBar>
        </Paper>



        <Box
          component="footer"
          sx={{
            py: 3, px: 2, mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[400]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              Brought to you by A.Champion and M.Steinberg
            </Typography>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );

}


export default App;
