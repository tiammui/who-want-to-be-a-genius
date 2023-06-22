import React, { useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { ROUTE_PATHS, CALC_TYPES } from './../utils/enums';

import NotFound from './NotFound';
import CalcTypeGPA from './../components/CalcTypeGPA';
import CalcTypeCGPA from './../components/CalcTypeCGPA';

export default function () {
  const navigate = useNavigate();
  let { calcType } = useParams();

  useState(() => {}, []);

  function calcTypeHnd(targetCalcType) {
    if (targetCalcType == calcType) return; // do nothing

    navigate(
      targetCalcType == CALC_TYPES.CGPA
        ? ROUTE_PATHS.CALC_TYPE_CGPA
        : ROUTE_PATHS.CALC_TYPE_GPA
    );
  }

  function isCGPA() {
    return calcType == CALC_TYPES.CGPA;
  }

  function isGPA() {
    return !calcType || calcType == CALC_TYPES.GPA;
  }

  return (
    <div id="home-screen">
      <div className="tab">
        <div className="tab-head">
          <div className={`gpa ${isGPA() ? 'active' : ''}`}>
            <button onClick={() => calcTypeHnd(CALC_TYPES.GPA)}>GPA</button>
          </div>
          <div className={`cgpa ${isCGPA() ? 'active' : ''}`}>
            <button onClick={() => calcTypeHnd(CALC_TYPES.CGPA)}>CGPA</button>
          </div>
        </div>
        <div className="tab-body page-container">
          {(isGPA() && <CalcTypeGPA />) || (isCGPA() && <CalcTypeCGPA />) || (
            <NotFound />
          )}{' '}
        </div>
      </div>
    </div>
  );
}
