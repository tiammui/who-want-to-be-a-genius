import React, { useRef, useState } from 'react';
import { nanoid } from 'nanoid';

import { ROUTE_PATHS, CALC_TYPES } from './../utils/enums';
import NotFound from './NotFound';
import { useStoreWrapper } from './../utils/stateStore';

export default function () {
  const { activeHeader, setActiveHeader } = useStoreWrapper('activeHeader');

  function headerScroll2(itemIndex) {
    let element = document
      .getElementById('home-header')
      .getElementsByClassName('item')[itemIndex];

    setActiveHeader(itemIndex);
    element.scrollIntoView();
  }

  return (
    <div id="home-screen">
      <div
        id="home-header"
        className="carousel"
        onScroll={() => {
          /* update activeHeader */
        }}
      >
        <ul>
          <li className="item">
            <div className="curtain">
              <div className="title">WHO WANT TO BE A GENIUS</div>
              <div className="subtitle">A FUN, BRAIN PROVOKING COMPETITION</div>
              <div className="big-body">
                <b>LCP</b> version of "
                <i>
                  <u>who want to be a millionaire</u>
                </i>
                ", But with different fun rules
              </div>
            </div>
          </li>
          <li className="item">
            <div className="curtain"></div>
          </li>
          <li className="item">
            <div className="curtain"></div>
          </li>
        </ul>
      </div>
      {/* TODO manage scrolling with navigator */}
      <div className="navigator">
        <button
          className={activeHeader == 0 ? 'active' : ''}
          // title={getProduct(productId).name}
          onClick={() => {
            activeHeader == 0 ? null : headerScroll2(0);
          }}
        ></button>
        <button
          className={activeHeader == 1 ? 'active' : ''}
          // title={getProduct(productId).name}
          onClick={() => {
            activeHeader == 1 ? null : headerScroll2(1);
          }}
        ></button>
        <button
          className={activeHeader == 2 ? 'active' : ''}
          // title={getProduct(productId).name}
          onClick={() => {
            activeHeader == 2 ? null : headerScroll2(2);
          }}
        ></button>
      </div>
    </div>
  );
}
