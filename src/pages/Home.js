import React, { useRef, useState } from 'react';
import { nanoid } from 'nanoid';

import { ROUTE_PATHS, CALC_TYPES } from './../utils/enums';

import NotFound from './NotFound';

export default function () {
  return (
    <div id="home-screen">
      <div
        id="home-header"
        className="carousel"
        onScroll={() => {
          /* update activeNavigator */
        }}
      >
        <ul>
          <HeaderItem />
        </ul>
      </div>
      {/* TODO manage scrolling with navigator */}
      <div className="navigator">
        <button
          className={activeNavigator == 0 ? 'active' : ''}
          // title={getProduct(productId).name}
          onClick={() => {
            activeNavigator == 0 ? null : headerScroll2(i);
          }}
        ></button>
      </div>
    </div>
  );
}
