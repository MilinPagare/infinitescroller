import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [count, setCount] = useState(100);

  const getData = async () => {
    const tempResult = await fetch(
      "https://jsonplaceholder.typicode.com/photos"
    );
    const result = await tempResult.json();
    setData(result);
    setDataToDisplay(result.slice(0, 100));
  };

  const handleScroll = () => {
    const userScrolledHeight = window.innerHeight + window.scrollY;
    const ele = document.getElementById("parentDiv");
    const contentHeight = ele.offsetHeight;
    if (userScrolledHeight >= contentHeight) {
      setDataToDisplay([...dataToDisplay, ...data.slice(count, count + 100)]);
      setCount(count + 100);
    }
  };

  useEffect(() => {
    getData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="parentDiv">
      {dataToDisplay.map((item, index) => (
        <div key={index} className="innerDiv">
          <img src={item.url} />
        </div>
      ))}
    </div>
  );
};

export default Home;
// const [images, setImages] = useState([]);
// const [imgToDisplay, setImgToDisplay] = useState([]);
// const [load, setLoad] = useState(20);
// const [toAdd, setToAdd] = useState(0);

// const getImages = async() => {
//     const result = await fetch("https://jsonplaceholder.typicode.com/photos");
//     const temp = await result.json();
//     setImages(temp);
//     setImgToDisplay(temp.slice(0,load));
//     setToAdd(load);
// }

// const handleScroll = () => {
//     const userScrollHeight = window.innerHeight+window.scrollY;
//     const windowBottomHeight = document.documentElement.offsetHeight;
//     if(userScrollHeight>=windowBottomHeight){
//         // getImages();
//         setImgToDisplay(images.slice(toAdd, toAdd+load));
//         setToAdd(toAdd+load);
//     }
// }

// useEffect(()=>{
//     getImages();
//     window.addEventListener('scroll', handleScroll);
// },[]);
// // https://jsonplaceholder.typicode.com/photos
// // https://picsum.photos/v2/list
// return (
//     <Box>
//         <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//             {imgToDisplay.map((item) => (
//                 <Grid item xs={2} sm={4} md={4} key={item.id}>
//                     <h1>hello</h1>
//                 </Grid>
//             ))}
//         </Grid>
//     </Box>
// );
