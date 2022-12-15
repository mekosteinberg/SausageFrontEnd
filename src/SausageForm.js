import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormGroup, Grid, Paper, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StyledRating from './StyledRating';


const client = axios.create({ baseURL: 'https://rate-my-brat-api.herokuapp.com/api' })


export default function SausageForm({ onSubmit }) {
    const [sausageType, setSausageType] = useState('')
    const [sausageImage, setSausageImage] = useState('')
    const [sausageComments, setSausageComments] = useState('')
    const [sausageRatings, setSausageRatings] = useState('')

    //Handle Change and Submit Forms/Buttons
    const handleChange = (setState) => (event) => {
        setState(event.target.value)
    }

    const resetForm = () => {
        setSausageType('')
        setSausageImage('')
        setSausageComments('')
        setSausageRatings('')
    }
    const handleNewSausageFormSubmit = (event) => {
        // console.log('submit')
        event.preventDefault()
        client
            .post('/sausages/new', {
                image: sausageImage,
                type: sausageType,
                description: sausageComments,
                ratings: sausageRatings
            })
            .then(() => {
                resetForm()
                onSubmit()
            })
    }

    return (

        <Grid align="center">
            <Paper align="left" sx={{ width: { sm: 750 }, m: 1 }} elevation={4}>
                <FormGroup>
                    <Typography sx={{ mt: 2, p: 2 }} variant="h4"><strong>You BRAT your Sausage!</strong></Typography>
                    <form onSubmit={handleNewSausageFormSubmit}>
                        <TextField
                            sx={{ m: 1, p: 1, width: 300 }}
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
                        <Typography sx={{ p: 2 }} variant="h6">Rating
                            <StyledRating sx={{ p: 2 }}
                                name="customized-color"
                                onChange={handleChange(setSausageRatings)}
                                defaultValue={2}
                                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                precision={0.5}
                                icon={<FavoriteIcon fontSize="inherit" />}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                value={sausageRatings}
                            />
                        </Typography>
                        <Button
                            sx={{ m: 2 }}
                            variant="contained"
                            type="submit"
                            color="success"
                        >Submit your Meat</Button>
                    </form>
                </FormGroup>
            </Paper>
        </Grid>
    )
}
