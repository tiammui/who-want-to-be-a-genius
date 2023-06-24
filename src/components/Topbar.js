import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import logo from "./../images/logo.png";

export default function () {
  return (
    <div id="top-bar">
      <Link to="/" className="logo" title="Go to homepage">
        <img
          // src={logo}
          alt="City Genius Logo"
        />
      </Link>
      <h1>
        WHO WANT TO BE A GENIUS
      </h1>
    </div>
  );
}
