import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import UpcomingMatch from "./pages/upcoming_match/UpcomingMatch";
import UpcomingMatchShow from "./pages/upcoming_match/UpcomingMatchShow";
import Subscribe from "./pages/subscribe/Subscribe";
import Home from "./pages/home/home";
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
            <Route path="/" element={<Home/>}></Route>
            {/* <Route path="/upcoming" element={<UpcomingMatch/>}/> */}
            <Route path="/upcoming" element={<UpcomingMatch/>}/>
            <Route path="/upcoming/:sport_id" element={<UpcomingMatchShow/>}/>
            <Route path="/subscribe" element={<Subscribe/>}/>
      </Routes>
        {/* footer here */}
      </BrowserRouter>

  )
}

export default App
