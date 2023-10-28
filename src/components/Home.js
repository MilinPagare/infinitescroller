import React, { useEffect, useState } from "react";
import {Box,Grid,ImageList,ImageListItem} from "@mui/material";

const Home = () => {
    const [images, setImages] = useState([]);
    const [imgToDisplay, setImgToDisplay] = useState([]);
    const [load, setLoad] = useState(20);
    const [toAdd, setToAdd] = useState(0);

    const getImages = async() => {
        const result = await fetch("https://jsonplaceholder.typicode.com/photos");
        const temp = await result.json();
        setImages(temp);
        setImgToDisplay(temp.slice(0,load));
        setToAdd(load);
    }

    const handleScroll = () => {
        const userScrollHeight = window.innerHeight+window.scrollY;
        const windowBottomHeight = document.documentElement.offsetHeight;
        if(userScrollHeight>=windowBottomHeight){
            // getImages();
            setImgToDisplay(images.slice(toAdd, toAdd+load));
            setToAdd(toAdd+load);
        }
    }

    useEffect(()=>{
        getImages();
        window.addEventListener('scroll', handleScroll);
    },[]);
// https://jsonplaceholder.typicode.com/photos
// https://picsum.photos/v2/list
    return (
        <Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {imgToDisplay.map((item) => (
                    <Grid item xs={2} sm={4} md={4} key={item.id}>
                        <h1>hello</h1>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Home;