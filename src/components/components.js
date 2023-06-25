import React from 'react';
import { nanoid } from 'nanoid';

import { capitalizeWords } from './../utils/helpers';
import { useStoreWrapper } from './../utils/stateStore';

const departmentOptions = [
  { value: '', text: 'Choose department' },
  { value: 'cs', text: 'Computer Science' },
  { value: 'bam', text: 'Business Admin' },
  { value: 'ce', text: 'Computer Engineering' },
  { value: 'bam', text: 'Electrical Engineering' },
  { value: 'otm', text: 'Office Tech and Management' },
  { value: 'acc', text: 'Accounting' },
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
  const { registerForm, registerFormChangeHnd } =
    useStoreWrapper('registerForm');

  return (
    <div className="input-con">
      <label htmlFor={inputName}>{capitalizeWords(labelText)}</label>
      {/* {(inputType == 'select' && (
        <SelectInput selectType={selectType} defaultValue={defaultValue} inputName={inputName} />
      )) || <TextInput placeholder={placeholder} defaultValue={defaultValue} inputName={inputName} />} */}
      {(inputType == 'select' && (
        <SelectInput
          {...{
            selectType,
            defaultValue: registerForm[inputName],
            inputName,
            changeHnd: registerFormChangeHnd,
          }}
        />
      )) || (
        <TextInput
          {...{
            placeholder,
            defaultValue: registerForm[inputName],
            inputName,
            changeHnd: registerFormChangeHnd,
            inputType,
          }}
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
      case 9:
        return 'var(--space9)';
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
    default:
      return <option value="">Nothing</option>;
  }
}
