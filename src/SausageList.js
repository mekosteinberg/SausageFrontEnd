import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StyledRating from './StyledRating';

const getLabelText = (value) => `${value} Heart${value !== 1 ? 's' : ''}`


export default function SausageList({ sausages, onEditClick }) {

    const editSausage = (sausage) => () => {
        onEditClick(sausage)
    }

    return (
        <Grid container sx={{ my: 4 }} spacing={4}>
            {sausages.map((sausage, index) => {
                return (

                    <Grid item xs={12} sm={6} md={4} key={sausage._id}>
                        <Card sx={{ my: 1, height: '100%', display: 'flex', flexDirection: 'column' }} elevation={6} >
                            <CardMedia sx={{ m: 1, p: 1, maxWidth: 230 }}
                                component="img"
                                image={sausage.image}
                                width="200"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">{sausage.type}</Typography>
                                <Typography sx={{ mb: 2 }}><strong>Comments: </strong> {sausage.description}</Typography>
                                <Typography>{getLabelText(sausage.ratings)}</Typography>
                                <StyledRating sx={{}}
                                    name="customized-color"
                                    value={sausage.ratings}
                                    getLabelText={getLabelText}
                                    precision={0.5}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                    readOnly
                                />
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={editSausage(sausage)}>Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            }
            )}
        </Grid>
    )
}
