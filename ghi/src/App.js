import { useEffect, useState } from "react";
import Navbar from "./components/ui/Navbar";
import SearchResults from "./components/search/SearchResults";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CardDetailPage from "./components/card-details/CardDetailPage";
import MyCollection from "./components/collection/CollectionList";
import MyCollection2 from "./components/collection/CollectionCards";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div className="page-container">
      <div className="content-wrap">
        <BrowserRouter basename={basename}>
          <Navbar />
          <Routes>
            <Route path="search" element={<SearchResults />} />
            <Route path="card/:multiverse_id" element={<CardDetailPage />} />
            <Route path="edit_collection" element={<MyCollection />}></Route>
            <Route path="collection" element={<MyCollection2 />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
