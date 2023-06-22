import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faShoppingCart,
  faUserAlt,
  faUserCircle,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';

// import logo from "./../images/logo.png";

export default function () {
  return (
    <div id="footer">
      <p>
        GPA+ was built with love by <Link to="">members of City Genius.</Link>
      </p>
      <div className="disclaimer">
        <h4>Disclaimer:</h4>
        <p>
          The school (LCP) didn’t officially endorse this project, it is an
          initiative of students.
        </p>
      </div>
      <div className="copy">
        City Genius	&copy; 2023
      </div>
    </div>
  );
}
