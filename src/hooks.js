import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (uri) => {

    const [data, setData] = useState("")

    useEffect(()=>{
        getData()   
    },[])

    const getData = async () => {
        const {data} = await axios.get(uri)
        setData(data)

        
    }
    return data;
}