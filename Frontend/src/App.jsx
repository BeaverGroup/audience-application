import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {

  return (
      <BrowserRouter>
      {/* navigateBar here */}
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
