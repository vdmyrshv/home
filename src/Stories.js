import React, { useState, useEffect } from 'react'

export default function Stories() {

    const [ stories, setStories ] = useState([])

    useEffect(()=>{
        //fetch("https://official-joke-api.appspot.com/jokes/random")
        fetch("https://news-proxy-server.appspot.com/topstories")
            .then(res=>res.json())
            .then(json=> {
                console.log(json)
                setStories(json)
            });
        
    },[])

    console.log("stories:", stories)

    return (
        <div>
            {stories.map(({ by, descendants, title, url, id, time }, index)=>(
                <div key={id}>
                    <h3>{index+1}. <a href={url} target="_blank">{title}</a></h3>
                    <h4>by: {by} - {new Date(time*1000).toLocaleString()} </h4>
                </div>
            ))}
        </div>
    )
}
