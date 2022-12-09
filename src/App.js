import React from 'react';
import {AppBar, Container, Paper, Typography} from '@mui/material';

const App = () =>{
  return (
    <Container>
      <Paper>
        <AppBar position="static" sx={{ m: 2, ml: 0, p: 2, bgcolor: 'secondary' }}>
          <Typography variant="h3">Rate my Brat!</Typography>
          <Typography variant="h6">Welcome to Octoberfest</Typography>
        </AppBar>
      </Paper>

    </Container> 
  );

}


export default App;
