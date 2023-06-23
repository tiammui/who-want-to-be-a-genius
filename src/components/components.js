import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faPlus,
  faTimes,
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
