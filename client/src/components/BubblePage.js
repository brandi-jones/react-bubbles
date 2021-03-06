import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    getData();
  }, [])


  const getData = () => {
    const token = window.localStorage.getItem('token');
    axiosWithAuth()
      .get('/api/colors')
      .then( response => {
        console.log("colors: ", response)
        setColorList(response.data)
      })
      .catch(error => {
        console.log("Error with GET request to fetch color list: ", error);
      })
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={getData} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
