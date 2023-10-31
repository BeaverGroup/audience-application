import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Subscribe from "./pages/subscribe/Subscribe";

function App() {

  return (
      <BrowserRouter>
      {/* navigateBar here */}
        <Routes>
            <Route>{/* page */}</Route>
            <Route>{/* page */}</Route>
            <Route path="/subscribe" element={<Subscribe/>}/>
        </Routes>
        {/* footer here */}
      </BrowserRouter>
  )
}

export default App
