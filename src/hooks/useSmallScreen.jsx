import * as React from "react";

const SMALL_SCREEN_BREAKPOINT = 1100;

export function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = React.useState(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${SMALL_SCREEN_BREAKPOINT}px)`);
    const onChange = () => {
      setIsSmallScreen(window.innerWidth <= SMALL_SCREEN_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsSmallScreen(window.innerWidth <= SMALL_SCREEN_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isSmallScreen;
}
