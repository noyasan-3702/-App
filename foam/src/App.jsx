import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Form from "./form";
import List from "./List";
import './App.css'

function App() {

  //　HTMLを表示する //
  return (
    <>
    <Router>
      <div className="inquiry-container">
        <h1 className="Title">★お問い合わせぇ★</h1>
        <nav>
          <Link to="/form">
            <button className="btn0">ふぉ～む</button>
          </Link>
          <Link to="/List">
            <button className="btn0">いちらぁん</button>
          </Link>
        </nav>
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/List" element={<List />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App;
