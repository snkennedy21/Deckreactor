import { useEffect, useState } from "react";
import Navbar from "./components/ui/Navbar";
import SearchResults from "./components/search/SearchResults";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdvancedSearch from "./components/search/AdvancedSearch";
import CardDetailPage from "./components/card-details/CardDetailPage";
import MyCollection from "./components/collection/CollectionList";
import MyCollection2 from "./components/collection/CollectionCards";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter basename={basename}>
      <Navbar></Navbar>
      <Routes>
        <Route path="search" element={<SearchResults />}></Route>
        <Route path="advanced-search" element={<AdvancedSearch />}></Route>
        <Route path="card/:multiverse_id" element={<CardDetailPage />} />
        <Route path="edit_collection" element={<MyCollection />}></Route>
        <Route path="collection" element={<MyCollection2 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
