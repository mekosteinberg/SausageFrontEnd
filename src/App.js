import React from 'react';
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Stack, Toolbar, Typography } from '@mui/material';
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

        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h2"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Brat Time
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Its Octoberfest! Everyone loves to take pics of their food, here's a way to rate your Octoberfest Feasts! Upload pics, say how it was and rate it 1-5 stars. Dont forget to check out the beverages section to find your perfect pairing!
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">Rate your own!</Button>
                <Button variant="outlined">Perfect Pairings</Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">

            <Grid container spacing={4}>

              <Grid xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia component="img" sx={{ p: 2 }} image="" alt="random" />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Sausage
                    </Typography>
                    <Typography>
                      Description:
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </main>
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
