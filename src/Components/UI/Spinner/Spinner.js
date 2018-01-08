import React from 'react';
import {Image} from 'react-bootstrap';
import classes from './Spinner.css';

const spinner = () => (
    <Image 
      src="https://loading.io/spinners/wave/lg.wave-ball-preloader.gif" 
      responsive
    />
);

export default spinner;
