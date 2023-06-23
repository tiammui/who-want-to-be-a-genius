import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import logo from "./../images/logo.png";

export default function () {
  return (
    <div id="top-bar" className="card">
      <Link to="/" className="logo" title="Go to homepage">
        <img
          // src={logo}
          height="30px"
          alt="logo"
        />
      </Link>

    </div>
  );
}
