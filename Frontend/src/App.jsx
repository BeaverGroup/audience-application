import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/home/home";
import UpcomingMatch from "./pages/upcoming_match/UpcomingMatch";

function App() {

  return (
      <BrowserRouter>
      {/* navigateBar here */}
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route>{/* page */}</Route>
            <Route path="/upcoming" element={<UpcomingMatch/>}/>
        </Routes>
        {/* footer here */}
      </BrowserRouter>
  )
}

export default App
