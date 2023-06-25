import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function () {
  useEffect(() => {
    window.scrollTo(0,0)
  }, []);

  return (
    <div id="thank-you">
      <FontAwesomeIcon icon={faCheckCircle} className="icon" />
      <div className="subtitle">Your info was successfully submitted</div>
      <div className="heading">We'll reach out to you soon</div>
    </div>
  );
}
