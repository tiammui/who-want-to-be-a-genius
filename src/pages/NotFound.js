import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

import { Spacer } from './../components/components';

export default function () {
  return (
    <div id="not-found">
      <h2>The requested page does not exist</h2>
      {/* 250 X 250 Page not found img */}
      <img src="https://storage.cloud.google.com/glow-dab38.appspot.com/general/404.jpg?alt=media" />
      <ul>
        <li>
          <FontAwesomeIcon icon={faCaretRight} />
          <Spacer space={10} />
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
}
