import { useEffect, useState } from "react";
import Navbar from "./components/ui/Navbar";
import SearchResults from "./components/search/SearchResults";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdvancedSearch from "./components/search/AdvancedSearch";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="search" element={<SearchResults />}></Route>
        <Route path="advanced-search" element={<AdvancedSearch />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
