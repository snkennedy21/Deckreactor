import { useEffect, useState } from "react";
import Navbar from "./components/ui/Navbar";
import SearchResults from "./components/search/SearchResults";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CardDetailPage from "./components/card-details/CardDetailPage";

function App() {
  const domain = /https:\/\/[^/]+/
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  return (
    <BrowserRouter basename={basename}>
      <Navbar></Navbar>
      <Routes>
        <Route path="search" element={<SearchResults />}/>
        <Route path="card/:multiverse_id" element={<CardDetailPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
