import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import WebFont from 'webfontloader';

// import './fonts/fonts.css';
import './styles/style.scss';
import { ROUTE_PATHS } from './utils/enums';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ThankYou from './pages/ThankYou';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import { Spacer } from './components/components';

export default function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Squada One', 'Comic Neue'],
      },
    });
  }, []);
  return (
    <>
      <Topbar />

      <div id="main-container">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path={ROUTE_PATHS.THANK_YOU} element={<ThankYou />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
