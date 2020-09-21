import React, { useEffect, useState } from 'react';
import WebFontLoader from "webfontloader";

import './scss/App.scss';

import "./scss/App.scss";


interface Props {
  test: string;
}

function App() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    // Fetch necessary fonts.
    WebFontLoader.load({
      custom: {
        families: [
          'opensasans',
          'anton'
        ]
      },
      fontactive: () => {
        setTimeout(() => {
          setFontsReady(true);
        }, 1000);
      }
    });
  }, []);

  return (
    <>
      { fontsReady && (<>
        <header>
          <h1>Movie Library</h1>
        </header>
        <main>
          Main content here
        </main>
        <footer>
          Footer here
        </footer>
      </>)}
    </>
  );
}

export default App;
