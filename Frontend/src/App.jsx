import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import UpcomingMatch from "./pages/upcoming_match/UpcomingMatch";
import UpcomingMatchShow from "./pages/upcoming_match/UpcomingMatchShow";

function App() {

  return (
      <BrowserRouter>
      {/* navigateBar here */}
        <Routes>
            <Route>{/* page */}</Route>
            <Route>{/* page */}</Route>
            <Route path="/upcoming" element={<UpcomingMatch/>}/>
            <Route path="/upcoming/:sport_id" element={<UpcomingMatchShow/>}/>
        </Routes>
        {/* footer here */}
      </BrowserRouter>
  )
}

export default App
