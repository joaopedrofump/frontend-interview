import React, { useEffect, useRef, useState } from 'react';
import Footer from './components/footer/Footer';
import Game from './components/game/Game';
import Header from './components/header/Header';
import Profile from './components/profile/Profile';

const TRANSPARENT_THRESHOLD = 150;

function App(): React.ReactElement {
  const [transparent, setTransparent] = useState<boolean>(false);

  const mainRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { current } = mainRef;
    let observer: IntersectionObserver;

    if (current && headerRef.current) {
      const topPosition = headerRef.current.getBoundingClientRect().height;
      const topMargin = topPosition + TRANSPARENT_THRESHOLD;
      const bottomMargin = window.innerHeight + topPosition;
      observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        setTransparent(entries[0].isIntersecting);
      }, {
        rootMargin: `${topMargin}px 0px -${bottomMargin}px 0px`
      });

      observer.observe(current);
    }

    return () => {
      if (!current) { return; }
      observer?.unobserve(current);
      observer?.disconnect();
    };
  }, []);

  return (
    <div>
      <Header ref={headerRef} isTransparent={transparent} />
      <main ref={mainRef}>
        <Profile />
        <Game />
      </main>
      <Footer />
    </div>
  );
}

export default App;
