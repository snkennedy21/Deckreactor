import { useEffect, useState } from "react";
import Navbar from "./components/ui/Navbar";
import SearchResults from "./components/search/SearchResults";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="search" element={<SearchResults />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
