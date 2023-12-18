import React, { useEffect, useRef, useState } from "react";
import "./Home.css";

const useLatestValue = (data) => {
  const dataRef = useRef(data);
  dataRef.current = data;
  return dataRef;
};

const Home = () => {
  const [data, setData] = useState([]);
  //   const dataRef = useRef([]);
  const dataRef = useLatestValue(data);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [count, setCount] = useState(10);

  const getData = async () => {
    const tempResult = await fetch(
      "https://jsonplaceholder.typicode.com/photos"
    );
    const result = await tempResult.json();
    setData(result);
    // dataRef.current = result;
    setDataToDisplay(result.slice(0, 10));
  };

  const handleScroll = () => {
    const userScrolledHeight = window.innerHeight + window.scrollY;
    const ele = document.getElementById("parentDiv");
    const contentHeight = ele.offsetHeight;
    if (userScrolledHeight >= contentHeight) {
      //   console.log({ data, dataToDisplay, dataRef: dataRef.current });
      setDataToDisplay((dataToDisplay) => [
        ...dataToDisplay,
        ...dataRef.current.slice(count, count + 10),
      ]);
      setCount((count) => count + 10);
    }
  };

  useEffect(() => {
    getData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  //   console.log({ data, dataToDisplay, count });

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
