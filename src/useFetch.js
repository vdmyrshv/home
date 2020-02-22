import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (uri) => {

    const [data, setData] = useState("")

    useEffect(()=>{
        getData()   
    },[])

    const getData = () => {
        axios.get(uri)
            .then(({data})=> {
                setData(data)
            });
        
    }
    return data;
}