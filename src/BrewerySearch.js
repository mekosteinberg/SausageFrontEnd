import React, { useState } from 'react'
import axios from 'axios'
import { Button, Card, CardContent, FormControl, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'

const client = axios.create({ baseURL: 'https://api.openbrewerydb.org/' })

const states = [
    { name: '', abbreviation: 'none' },
    { name: 'ALABAMA', abbreviation: 'AL' },
    { name: 'ALASKA', abbreviation: 'AK' },
    { name: 'AMERICAN SAMOA', abbreviation: 'AS' },
    { name: 'ARIZONA', abbreviation: 'AZ' },
    { name: 'ARKANSAS', abbreviation: 'AR' },
    { name: 'CALIFORNIA', abbreviation: 'CA' },
    { name: 'COLORADO', abbreviation: 'CO' },
    { name: 'CONNECTICUT', abbreviation: 'CT' },
    { name: 'DELAWARE', abbreviation: 'DE' },
    { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
    { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM' },
    { name: 'FLORIDA', abbreviation: 'FL' },
    { name: 'GEORGIA', abbreviation: 'GA' },
    { name: 'GUAM', abbreviation: 'GU' },
    { name: 'HAWAII', abbreviation: 'HI' },
    { name: 'IDAHO', abbreviation: 'ID' },
    { name: 'ILLINOIS', abbreviation: 'IL' },
    { name: 'INDIANA', abbreviation: 'IN' },
    { name: 'IOWA', abbreviation: 'IA' },
    { name: 'KANSAS', abbreviation: 'KS' },
    { name: 'KENTUCKY', abbreviation: 'KY' },
    { name: 'LOUISIANA', abbreviation: 'LA' },
    { name: 'MAINE', abbreviation: 'ME' },
    { name: 'MARSHALL ISLANDS', abbreviation: 'MH' },
    { name: 'MARYLAND', abbreviation: 'MD' },
    { name: 'MASSACHUSETTS', abbreviation: 'MA' },
    { name: 'MICHIGAN', abbreviation: 'MI' },
    { name: 'MINNESOTA', abbreviation: 'MN' },
    { name: 'MISSISSIPPI', abbreviation: 'MS' },
    { name: 'MISSOURI', abbreviation: 'MO' },
    { name: 'MONTANA', abbreviation: 'MT' },
    { name: 'NEBRASKA', abbreviation: 'NE' },
    { name: 'NEVADA', abbreviation: 'NV' },
    { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
    { name: 'NEW JERSEY', abbreviation: 'NJ' },
    { name: 'NEW MEXICO', abbreviation: 'NM' },
    { name: 'NEW YORK', abbreviation: 'NY' },
    { name: 'NORTH CAROLINA', abbreviation: 'NC' },
    { name: 'NORTH DAKOTA', abbreviation: 'ND' },
    { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP' },
    { name: 'OHIO', abbreviation: 'OH' },
    { name: 'OKLAHOMA', abbreviation: 'OK' },
    { name: 'OREGON', abbreviation: 'OR' },
    { name: 'PALAU', abbreviation: 'PW' },
    { name: 'PENNSYLVANIA', abbreviation: 'PA' },
    { name: 'PUERTO RICO', abbreviation: 'PR' },
    { name: 'RHODE ISLAND', abbreviation: 'RI' },
    { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
    { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
    { name: 'TENNESSEE', abbreviation: 'TN' },
    { name: 'TEXAS', abbreviation: 'TX' },
    { name: 'UTAH', abbreviation: 'UT' },
    { name: 'VERMONT', abbreviation: 'VT' },
    { name: 'VIRGIN ISLANDS', abbreviation: 'VI' },
    { name: 'VIRGINIA', abbreviation: 'VA' },
    { name: 'WASHINGTON', abbreviation: 'WA' },
    { name: 'WEST VIRGINIA', abbreviation: 'WV' },
    { name: 'WISCONSIN', abbreviation: 'WI' },
    { name: 'WYOMING', abbreviation: 'WY' }
]

export default function BrewerySearch() {

    const [city, setCity] = useState('')
    const [usState, setUSState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [breweries, setBreweries] = useState([])


    //Handle Change and Submit Forms/Buttons
    const handleChange = (setState) => (event) => {
        setState(event.target.value)
    }

    const brewSearchSubmit = (event) => {
        // console.log('submit')
        const params = {}
        if (city) {
            params.by_city = city
        }
        if (usState) {
            params.by_state = usState
        }
        if (zipcode) {
            params.by_postal = zipcode
        }
        event.preventDefault()
        client
            .get('/breweries', {
                params
            })
            .then((response) => {
                setBreweries(response.data)
            })
    }

    return (

        <Grid align="center">
            <Paper align="left" sx={{ width: { sm: 750 }, my: 3 }} elevation={4}>
                <FormGroup>
                    <Typography sx={{ width: 700, mt: 2, p: 2 }} variant="h5"><strong>Find a local brew spot</strong></Typography>
                    <form onSubmit={brewSearchSubmit}>
                        <Stack direction="row" spacing={3} justifyContent="center" >
                            <TextField sx={{ width: 300 }}
                                onChange={handleChange(setCity)}
                                value={city}
                                label="City"
                                variant="outlined" />
                            <FormControl sx={{ width: 100 }}>
                                <InputLabel id="state-label">State</InputLabel>
                                <Select
                                    labelId="state-label"
                                    onChange={handleChange(setUSState)}
                                    value={usState}
                                    label="State"
                                    variant="outlined">
                                    {states.map((item) => <MenuItem key={item.abbreviation} value={item.name}>{item.abbreviation}</MenuItem>)}
                                </Select>
                            </FormControl>


                            <TextField sx={{ width: 100 }}
                                value={zipcode}
                                onChange={handleChange(setZipcode)}
                                label="Zipcode"
                                variant="outlined" />
                        </Stack>
                        <Button
                            sx={{ m: 2 }}
                            variant="contained"
                            type="submit"
                            color="success"
                        >Search</Button>
                    </form>
                </FormGroup>
            </Paper>
            <Grid container sx={{ my: 4 }} spacing={4}>
                {breweries.map((brewery, index) => {
                    return (

                        <Grid item xs={12} sm={6} md={4} key={brewery._id}>
                            <Card sx={{ my: 1, height: '100%', display: 'flex', flexDirection: 'column' }} elevation={6} >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">{brewery.name}</Typography>
                                    <Typography sx={{ mb: 2 }}><strong>Address: </strong></Typography>
                                    <Typography sx={{ mb: 2 }}>{brewery.street}</Typography>
                                    <Typography sx={{ mb: 2 }}>{brewery.city}, {brewery.state}  {brewery.zipcode}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                }
                )}
            </Grid>
        </Grid>
    )
}
