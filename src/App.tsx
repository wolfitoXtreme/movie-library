import React, { useEffect, useState } from 'react';

import WebFontLoader from 'webfontloader';
import './scss/App.scss';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';

interface Props {
  test: string;
}

function App() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    // Fetch necessary fonts.
    WebFontLoader.load({
      custom: {
        families: ['opensasans', 'anton'],
      },
      fontactive: () => {
        setTimeout(() => {
          setFontsReady(true);
        }, 1000);
      },
    });
  }, []);

  return (
    <>
      {fontsReady && (
        <>
          <Header />
          <Search />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
