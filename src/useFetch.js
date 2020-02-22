import React, { useState, useEffect } from 'react';

export const useFetch = (uri) => {

    const [data, setData] = useState("")

    useEffect(()=>{
        getData()   
    },[])

    const getData = () => {
        fetch(uri)
            .then(res=>res.json())
            .then(json=> {
                console.log("joke json", json)
                setData(json)
            });
        
    }
    return data;
}