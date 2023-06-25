import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import { ROUTE_PATHS, CALC_TYPES } from './../utils/enums';
import { useStoreWrapper } from './../utils/stateStore';
import { register } from './../utils/firebase';
import NotFound from './NotFound';
import { InputCon, Spacer } from './../components/components';

export default function () {
  const { activeHeader, setActiveHeader } = useStoreWrapper('activeHeader');
  const { registerForm, setRegisterForm } = useStoreWrapper('registerForm');

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0,0)
    headerScroll2(1);
  }, []);

  function headerScroll2(itemIndex) {
    let element = document
      .getElementById('home-header')
      .getElementsByClassName('item')[itemIndex];

    setActiveHeader(itemIndex);
    element.scrollIntoView();
  }

  /**
   *
   * @param {boolean} prev
   */
  function slide(prev) {
    if (prev) {
      headerScroll2(activeHeader - 1 < 0 ? 2 : activeHeader - 1);
    } else {
      headerScroll2(activeHeader + 1 < 3 ? activeHeader + 1 : 0);
    }
  }

  function registerFormSubmitHnd(e) {
    e.preventDefault();
    console.log(registerForm);
    register(registerForm)
      .then(() => {
        setRegisterForm({});
        navigate(ROUTE_PATHS.THANK_YOU);
      })
      .catch((err) => {
        alert('An error occurred \n You can call 0808 352 4016 (Muizz) to register');
        console.error(err);
      });
  }

  function toRegister(){
    document
      .getElementById('register').scrollIntoView()
  }

  return (
    <div id="home-screen">
      <div className="color-band"></div>
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
              <div className="title">
                WHO WANT TO <br /> BE A GENIUS
              </div>
              <div className="subtitle">A FUN, BRAIN PROVOKING COMPETITION</div>
              <div className="heading">
                <b>LCP</b> version of "
                <i>
                  <u>who want to be a millionaire</u>
                </i>
                ", But with different fun rules
              </div>
            </div>
          </li>
          <li className="item">
            <div className="curtain">
              <div className="heading">
                REPRESENT YOUR DEPARTMENT IN THE COMPETITION TO WIN FROM THE
                CASH PRIZE OF
              </div>
              <div className="exclamation">₦10,000</div>
              <button className="btn" onClick={toRegister}>Register</button>
            </div>
          </li>
          <li className="item">
            <div className="curtain">
              <div className="heading">All Part-time students are invited</div>
              <div className="heading">
                Snacks will be served <br /> It would be fun
              </div>
              <div className="heading">
                Holding @ <br /> ONABANJO HALL <br /> 4PM Saturday, JULY 1st
                2023
              </div>
              <button className="btn" onClick={toRegister}>Register</button>
            </div>
          </li>
        </ul>
      </div>

      <div className="sliders">
        <button className="slider next" onClick={() => slide()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button className="slider prev" onClick={() => slide(true)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

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
      <div className="color-band"></div>

      <div id="register">
        <h3 className="heading">Participant Registration</h3>
        <p>
          If you’re willing to try your shot at the cash price of ₦10,000
          provide your details below.
        </p>

        <form onSubmit={registerFormSubmitHnd}>
          <InputCon
            inputName={`register-name`}
            labelText={`Fullname`}
            placeholder={`Your fullname here ...`}
            inputType="text"
          />
          <InputCon
            inputName={`register-department`}
            labelText={`Department`}
            inputType="select"
            selectType={'department'}
          />
          <InputCon
            inputName={`register-number`}
            labelText={`Phone number`}
            placeholder={`Your phone number here ...`}
            inputType="number"
          />
          <Spacer axis="y" spaceRatio={4} />
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
