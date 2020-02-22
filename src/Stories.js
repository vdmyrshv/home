import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'

export default function Stories() {

    const data = useFetch("https://news-proxy-server.appspot.com/topstories");
    const stories = [...data];

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
