import React from "react";

import { root } from './Footer.scss';

const Footer: React.FC = () => (
  <footer className={root}>
    <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
  </footer>
);

export default Footer;
