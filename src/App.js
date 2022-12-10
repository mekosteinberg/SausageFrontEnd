import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Container, FormGroup, Grid, Paper, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';

//-----------------
//Ratings portion of the Sausage Card
//-----------------
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

//-----------------
//Footer Theme
//-----------------
const theme = createTheme();
//-----------------
// PAGE CONTENT
//-----------------
const App = () => {

  //-----------------
  // Setup UseState
  //-----------------
  const [sausages, setSausages] = useState([])
  const [addSausage, setAddSausage] = useState([])

  const [sausageType, setSausageType] = useState('')
  const [sausageImage, setSausageImage] = useState('')
  const [sausageComments, setSausageComments] = useState('')
  const [sausageId, setSausageId] = useState('')

  //-----------------
  // NAV Buttons
  //-----------------
  const [areSausagesVisible, setAreSausagesVisible] = useState(true)
  const [isAddSausageVisible, setAddSausageVisible] = useState(false)
  const [areDrinksVisible, setAreDrinksVisible] = useState(false)

  const showSausages = () => {
    setAreSausagesVisible(true)
    setAddSausageVisible(false)
    setAreDrinksVisible(false)
  }
  const showAddSausages = () => {
    setAreSausagesVisible(false)
    setAddSausageVisible(true)
    setAreDrinksVisible(false)
  }
  const showDrinks = () => {
    setAreSausagesVisible(false)
    setAddSausageVisible(false)
    setAreDrinksVisible(true)
  }

  //Handle Change and Submit Forms/Buttons
  const handleChange = (setState) => (event) => {
    setState(event.target.value)
  }

  const handleNewSausageFormSubmit = (event) => {
    // console.log('submit')
    event.preventDefault()
    axios
      .post('http://rate-my-brat-api.herokuapp.com/api/sausages/new', {
        image: sausageImage,
        type: sausageType,
        description: sausageComments,
      })
      .then(() => {
        resetForm()
        showSausages()
        axios
          .get('http://rate-my-brat-api.herokuapp.com/api/sausages')
          .then((response) => {
            setSausages(response.data)
          })
      })
  }

  const resetForm = () => {
    setSausageType('')
    setSausageImage('')
    setSausageComments('')
  }

  useEffect(() => {
    axios.get('http://rate-my-brat-api.herokuapp.com/api/sausages/').then((response) => {
      setSausages(response.data)
      setAddSausage(response.data)
    })
  })

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
            sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h2"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >Brat Time</Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Its Octoberfest! Everyone loves to take pics of their food, here's a way to rate your Octoberfest Feasts! Upload pics, say how it was and rate it 1-5 stars. Dont forget to check out the beverages section to find your perfect pairing!
              </Typography>
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center" >
                <Button variant={areSausagesVisible ? "contained" : "outlined"} onClick={showSausages}>The Goods</Button>
                <Button variant={isAddSausageVisible ? "contained" : "outlined"} onClick={showAddSausages}>Rate your own!</Button>
                <Button variant={areDrinksVisible ? "contained" : "outlined"} onClick={showDrinks}>Perfect Pairings</Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">

            <Grid container spacing={4}>
              {areSausagesVisible
                && sausages.map((sausage, index) => {
                  return (
                    <Grid xs={12} sm={6} md={4}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia component="img" sx={{ p: 2 }} image={sausage.image} />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            Type: {sausage.type}
                          </Typography>
                          <Typography>
                            Comments: {sausage.description}
                          </Typography>
                        </CardContent>
                        <StyledRating sx={{ p: 2 }} name="customized-color" defaultValue={2}
                          // getLabelText={(value:"number") => `${value} Heart${value !== 1 ? 's' : ''}`}
                          precision={0.5}
                          icon={<FavoriteIcon fontSize="inherit" />}
                          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        />
                        <CardActions>
                          <Button size="small">View</Button>
                          <Button size="small">Edit</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )
                }
                )}
            </Grid>

            <Grid align="center">
              {isAddSausageVisible
                &&
                <Paper align="left" sx={{ width: { sm: 750 }, m: 1 }} elevation={4}>
                  <FormGroup>
                    <Typography sx={{ mt: 2, p: 2 }} variant="h4"><strong>You BRAT your Sausage!</strong></Typography>
                    <form onSubmit={handleNewSausageFormSubmit}>
                      <TextField
                        sx={{ m: 1, p: 1 }}
                        onChange={handleChange(setSausageType)}
                        id="outlined-basic"
                        label="Type of Meat"
                        variant="outlined"
                        value={sausageType} />
                      <TextField sx={{ width: 700, m: 1, p: 1 }}
                        onChange={handleChange(setSausageImage)}
                        multiline maxRows={2}
                        id="outlined-multiline-flexible"
                        label="Image Link"
                        variant="outlined"
                        value={sausageImage} /><br />
                      <TextField
                        sx={{ width: 700, m: 1, p: 1 }}
                        rows={4}
                        multiline maxRows={8}
                        onChange={handleChange(setSausageComments)}
                        id="outlined-multiline-flexible"
                        label="Comments"
                        variant="outlined"
                        value={sausageComments} /><br />
                      <Button
                        sx={{ m: 2 }}
                        variant="contained"
                        type="submit"
                        color="success"
                      >Submit your Meat</Button>
                    </form>
                  </FormGroup>
                </Paper>
              }
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
