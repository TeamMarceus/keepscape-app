'use client';

import React from 'react';

import { Inter, Montserrat } from 'next/font/google';

import 'material-icons/iconfont/material-icons.css';
import '../styles/globals.scss';
import '../styles/normalize.css';

import PropTypes from 'prop-types';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function GlobalError({ error }) {
  return (
    <html className={`${inter.variable} ${montserrat.variable}`} lang="en">
      <body>
        {error}
      </body>
    </html>
  );
}

GlobalError.propTypes = {
  error: PropTypes.any,
};
