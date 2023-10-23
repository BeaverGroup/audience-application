import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import HorizontalNav from "./components/horizontal_navbar/HorizontalNav";
import VerticalNav from "./components/vertical_navbar/VerticalNav";
import { useState, useEffect } from 'react';
import { widthToChangeNav, heightToChangeNav } from "./services/constants";


function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResizeWindow = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResizeWindow);


    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    }
  }, []);
  return (
    <BrowserRouter>
      {/* navigateBar here */}
      <HorizontalNav />

      {screenWidth < widthToChangeNav || screenHeight < heightToChangeNav ? "" : <VerticalNav />}
      {/* <VerticalNav/> */}
      <Routes>
        <Route>{/* page */}</Route>
        <Route>{/* page */}</Route>
        <Route>{/* page */}</Route>
      </Routes>
      {/* footer here */}
    </BrowserRouter>
  )
}

export default App
