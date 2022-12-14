import React from 'react'
import axios from 'axios'


const client = axios.create({ baseURL: 'https://api.openbrewerydb.org/' })


export default function BrewerySearch() {
  return (
    <div>BrewerySearch</div>
  )
}
