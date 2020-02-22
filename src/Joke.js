import React, { useState, useEffect } from 'react'

export default function Joke() {

    const [joke, setJoke] = useState({})

    useEffect(()=>{
        fetch("https://official-joke-api.appspot.com/jokes/random")
            .then(res=>res.json())
            .then(json=> console.log("joke json", json));
    },[])

    return (
        <div>
            <h3>Joke</h3>
        </div>
    )
}
