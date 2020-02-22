import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'

export default function Joke() {

    const { setup, punchline } = useFetch("http://localhost:3005/jokes/random")

    return (
        <div>
            <h3>Joke of the session</h3>
            <h4>Q: {setup} </h4>
            <h4>A: {punchline} </h4>
        </div>
    )
}
