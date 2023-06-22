import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faExclamationCircle,
  faChevronRight,
  faPlus,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

import { capitalizeWords } from './../utils/helpers';
import { useStoreWrapper } from './../utils/stateStore';

export function Button({ styleType, text, actionHnd }) {
  const emptyFunc = () => {};
  return (
    <button
      className={`btn ${styleType == 'b' ? 'type-b' : 'type-a'}`}
      onClick={actionHnd || emptyFunc}
    >
      <div>{styleType == 'b' ? capitalizeWords(text) : text.toUpperCase()}</div>
      <div className="icon">
        <FontAwesomeIcon icon={styleType == 'b' ? faPlus : faChevronRight} />
      </div>
    </button>
  );
}
export function CloseButton({ actionHnd }) {
  const emptyFunc = () => {};
  return (
    <button className="close-btn" onClick={actionHnd || emptyFunc}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
}

export function CourseCard({ id, code, units, score, position }) {
  const { isLcpGpaCalc } = useStoreWrapper('isLcpGpaCalc'); // to determine if the course-card is for LCP GPA Calculation

  return (
    <div className="course-card card">
      <div className="top">
        <div className="position">{position}</div>
        {isLcpGpaCalc ? '' : <CloseButton />}
      </div>
      <div className="inputs">
        {/* <div className="course-input-con">
        <label htmlFor="">Course Code:</label>
        <Spacer axis="x" spaceRatio={1}></Spacer>
        <input type="text" aria-invalid="false" />
        <ul id={`-error`} className="error">
          <li>Only alphabets are allowed</li>
        </ul>

        <div className="info">
          <FontAwesomeIcon icon={faInfoCircle} />
        </div>
      </div> */}
        <CourseInputCon
          labelText="course code"
          inputType="text"
          inputName="course-id"
          defaultValue={code.toUpperCase()}
          disabled={isLcpGpaCalc}
          changeHnd={() => 1}
        />
        <CourseInputCon
          labelText="course units"
          inputType="number"
          inputName="course-id"
          defaultValue={units}
          disabled={isLcpGpaCalc}
          changeHnd={() => 1}
        />
        <CourseInputCon
          labelText="total score"
          inputType="number"
          inputName="course-id"
          defaultValue=""
          disabled={false}
          changeHnd={() => 1}
        />
      </div>
      <div className="result">
        <div className="grade">
          <div className="title">Grade</div>
          <div className="value">A+</div>
        </div>
        <div className={`gpe ${isLcpGpaCalc ? '' : 'useless'}`}>
          {/* for NBTE GPA calculation hide GPE */}
          <div className="title">GPE</div>
          <div className="value">3.5</div>
        </div>
        <div className="gp">
          <div className="title">GP</div>
          <div className="value">15 / 20</div>
        </div>
      </div>
    </div>
  );
}

export function CourseInputCon({
  inputName,
  labelText,
  defaultValue,
  changeHnd,
  inputType,
  infoText,
  disabled,
}) {
  return (
    <div className="course-input-con">
      <label htmlFor={inputName}>{capitalizeWords(labelText)}:</label>
      <Spacer axis="x" spaceRatio={1}></Spacer>
      <input
        type={inputType}
        name={inputName}
        value={defaultValue || ''}
        disabled={disabled}
        aria-invalid="false"
        onChange={changeHnd}
      />
      <ul id={`${inputName}-error`} className="error">
        <li>Only alphabets are allowed</li>
      </ul>

      <div className="info">
        <FontAwesomeIcon icon={faInfoCircle} />
      </div>
    </div>
  );
}

export function InfoNote({ text, link }) {
  return (
    <div className="info-note note-card">
      <div className="info">
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </div>
        <p>{text}</p>
      </div>
      <div>
        <Link to={link}>Click here to know more</Link>
      </div>
    </div>
  );
}

const departmentOptions = [
  { value: '', text: 'Choose department' },
  { value: 'cs', text: 'Computer Science' },
  { value: 'cs', text: 'Computer Science' },
];
const programOptions = [
  { value: '', text: 'Choose program' },
  { value: 'nd-pt', text: 'ND Part-time' },
  { value: 'nd-pt', text: 'ND Part-time' },
];
const semesterOptions = [
  { value: '', text: 'Choose semester' },
  { value: '4', text: '4th Semester (Year II 1st semester)' },
  { value: '4', text: '4th Semester (Year II 1st semester)' },
];
export function InputCon({
  inputName,
  labelText,
  placeholder,
  inputType,
  selectType,
  defaultValue,
  changeHnd,
}) {
  return (
    <div className="input-con">
      <label htmlFor={inputName}>{capitalizeWords(labelText)}</label>
      {/* {(inputType == 'select' && (
        <SelectInput selectType={selectType} defaultValue={defaultValue} inputName={inputName} />
      )) || <TextInput placeholder={placeholder} defaultValue={defaultValue} inputName={inputName} />} */}
      {(inputType == 'select' && (
        <SelectInput {...{ selectType, defaultValue, inputName, changeHnd }} />
      )) || (
        <TextInput
          {...{ placeholder, defaultValue, inputName, changeHnd, inputType }}
        />
      )}
      <ul id={`${inputName}-error`} className="error">
        <li>Only alphabets are allowed</li>
      </ul>
    </div>
  );
}

export function ResultBar({ titleLeft, titleRight, valueLeft, valueRight }) {
  return (
    <div className="result-bar bar">
      <div className="left">
        <div className="title">{titleLeft}</div>
        <div className="value">{valueLeft}</div>
      </div>
      <div className="right">
        <div className="title">{titleRight}</div>
        <div className="value">{valueRight}</div>
      </div>
    </div>
  );
}

export function Spacer({ axis, spaceRatio }) {
  /**
   *
   * @param {number} ratio relative to standard-spacing
   */
  function cssVar(ratio) {
    switch (ratio) {
      case 1:
        return 'var(--space)';
      case 2:
        return 'var(--space2)';
      case 3:
        return 'var(--space3)';
      case 4:
        return 'var(--space4)';
      default:
        return '0px';
    }
  }

  return (
    <div
      style={{
        display: !axis || axis == 'x' ? 'inline-block' : 'block',
        height: !axis || axis == 'x' ? '0px' : cssVar(spaceRatio),
        width: !axis || axis == 'x' ? cssVar(spaceRatio) : '0px',
      }}
    ></div>
  );
}

export function TermNote({ heading, texts }) {
  return (
    <div className="term-note note-card">
      <h3>{heading}</h3>
      {texts.map((text) => (
        <p key={nanoid()}>{text}</p>
      ))}
    </div>
  );
}

function SelectInput({ selectType, defaultValue, inputName, changeHnd }) {
  return (
    <select
      id={inputName}
      name={inputName}
      value={defaultValue || ''}
      aria-invalid="false"
      aria-errormessage={`${inputName}-error`}
      onChange={changeHnd}
    >
      {renderOptions(selectType)}
    </select>
  );
}

function TextInput({
  placeholder,
  defaultValue,
  inputName,
  changeHnd,
  inputType,
}) {
  return (
    <input
      id={inputName}
      type={inputType}
      name={inputName}
      placeholder={placeholder}
      value={defaultValue || ''}
      aria-invalid="false"
      aria-errormessage={`${inputName}-error`}
      onChange={changeHnd}
    />
  );
}

function renderOptions(selectType) {
  switch (selectType) {
    case 'department':
      return departmentOptions.map((option) => (
        <option value={option.value} key={nanoid()}>
          {option.text}
        </option>
      ));
    case 'program':
      return programOptions.map((option) => (
        <option value={option.value} key={nanoid()}>
          {option.text}
        </option>
      ));
    case 'semester':
      return semesterOptions.map((option) => (
        <option value={option.value} key={nanoid()}>
          {option.text}
        </option>
      ));
    default:
      return <option value="">Nothing</option>;
  }
}
