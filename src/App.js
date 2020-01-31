import "./App.css";

import React, { useEffect, useState } from "react";

import Slideshow from "./Slideshow";

function App() {
  let [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      let response = await fetch("/api/images");
      let images = await response.json();
      setImages(images);
    }
    fetchImages();
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <Slideshow images={[]} />
    </div>
  );
}

export default App;
