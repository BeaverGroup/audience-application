import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import HorizontalNav from "./components/horizontal_navbar/HorizontalNav";
import VerticalNav from "./components/vertical_navbar/VerticalNav";

function App() {

  return (
      <BrowserRouter>
      {/* navigateBar here */}
      <HorizontalNav/>
      <VerticalNav/>
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
