import React, { useState, useEffect } from 'react'

export default function Joke() {

    const [joke, setJoke] = useState({})

    useEffect(()=>{
        //fetch("https://official-joke-api.appspot.com/jokes/random")
        fetch("http://localhost:3005/jokes/random")
            .then(res=>res.json())
            .then(json=> {
                console.log("joke json", json)
                setJoke(json)
            });
        
    },[])

    const { setup, punchline } = joke;

    return (
        <div>
            <h3>Joke of the session</h3>
            <h4>Q: {setup} </h4>
            <h4>A: {punchline} </h4>
        </div>
    )
}
