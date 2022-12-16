import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyledRating from './StyledRating';
import { Box, Button, FormGroup, Modal, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const client = axios.create({ baseURL: 'https://rate-my-brat-api.herokuapp.com/api' })
//from MUI Modal docs
const modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

export default function SausageModal({ open,
    onClose, onSubmit, onDelete,
    sausage
}) {
    const [sausageId, setSausageId] = useState('')
    const [sausageType, setSausageType] = useState('')
    const [sausageImage, setSausageImage] = useState('')
    const [sausageComments, setSausageComments] = useState('')
    const [sausageRatings, setSausageRatings] = useState('')

//Sets data in the modal to edit
    useEffect(() => {
        setSausageId(sausage._id)
        setSausageType(sausage.type)
        setSausageImage(sausage.image)
        setSausageComments(sausage.description)
        setSausageRatings(sausage.ratings)
    }, [sausage])
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

    const deleteSausage = (event) => {
        event.preventDefault()
        client
            .delete('/sausages/' + sausageId)
            .then(() => {
                resetForm()
                onDelete()
            })
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault(
            client
                .put('/sausages/' + sausageId, {
                    type: sausageType,
                    image: sausageImage,
                    description: sausageComments,
                    ratings: sausageRatings
                })
                .then(() => {
                    onSubmit()
                    resetForm()
                })
        )
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalstyle}>
                <FormGroup>
                    <Typography sx={{ mt: 2, p: 2 }} variant="h5"><strong>Edit</strong></Typography>
                    <form onSubmit={handleEditFormSubmit}>
                        <TextField
                            sx={{ m: 1, p: 1, width: 300 }}
                            onChange={handleChange(setSausageType)}
                            id="outlined-basic"
                            label="Type"
                            variant="outlined"
                            value={sausageType} />
                        <TextField
                            sx={{ m: 1, p: 1, width: 700 }}
                            onChange={handleChange(setSausageImage)}
                            id="outlined-basic"
                            label="image"
                            variant="outlined"
                            value={sausageImage} />
                        <TextField sx={{ width: 700, m: 1, p: 1 }}
                            onChange={handleChange(setSausageComments)}
                            id="outlined-multiline-flexible"
                            multiline maxRows={3}
                            label="Comments"
                            variant="outlined"
                            value={sausageComments} />

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
                        >Submit</Button>
                        <Button size="small" onClick={deleteSausage}>Delete</Button>
                    </form>
                </FormGroup>
            </Box>
        </Modal>
    )
}
