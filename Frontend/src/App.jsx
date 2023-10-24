import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import UpcomingMatch from "./pages/upcoming_match/UpcomingMatch";

function App() {

  return (
      <BrowserRouter>
      {/* navigateBar here */}
        <Routes>
            <Route>{/* page */}</Route>
            <Route>{/* page */}</Route>
            <Route path="/upcoming" element={<UpcomingMatch/>}/>
        </Routes>
        {/* footer here */}
      </BrowserRouter>
  )
}

export default App
