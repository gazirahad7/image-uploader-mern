import React from "react";

import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Task: Image Uploader</h1>
        </Link>
      </div>
    </header>
  );
}
