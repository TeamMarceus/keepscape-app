import React from 'react';

import { Inter, Montserrat } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import PropTypes from 'prop-types';

import 'material-icons/iconfont/material-icons.css';
import '../styles/globals.scss';
import '../styles/normalize.css';

import Providers from './providers';

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

export const metadata = {
  title: 'Keepscape',
};

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${montserrat.variable}`} lang="en">
      <body>
        <NextTopLoader color="#3BAFDA" height={5} showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.any,
};
