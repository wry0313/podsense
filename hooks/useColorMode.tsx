import { useEffect, createContext, useState, useContext } from "react";

const colorModes = {
  dark: "dark",
  light: "light",
};

type ColorModeContextType = {
  colorMode: string;
  setColorMode: Function;
};

const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined
);

interface ColorModeProviderProps {
  children: React.ReactNode;
}

export const MyColorModeProvider: React.FC<ColorModeProviderProps> = ({
  children,
}) => {
  const [colorMode, rawSetColorMode] = useState<string>(colorModes.light);

  // returns dark or light
  const getMediaQueryPreference = () => {
    const mediaQuery = "(prefers-color-scheme: dark)";
    const mql = window.matchMedia(mediaQuery);
    const hasMediaQueryPreference = typeof mql.matches === "boolean";

    if (hasMediaQueryPreference) {
      return mql.matches ? colorModes.dark : colorModes.light;
    }
    return colorModes.light;
  };

  // stores preference from localstorage
  const storeUserSetPreference = (pref: string) => {
    localStorage.setItem("theme", pref);
  };

  // gets preference from localstorage
  const getUserSetPreference = () => {
    return localStorage.getItem("theme");
  };

  // initialize color mode
  useEffect(() => {
    const userSetPreference = getUserSetPreference();
    if (
      userSetPreference !== null &&
      Object.values(colorModes).includes(userSetPreference)
    ) {
      rawSetColorMode(userSetPreference);
    } else {
      const mediaQueryPreference = getMediaQueryPreference();
      rawSetColorMode(mediaQueryPreference);
    }
  }, []);

  const setColorMode = (pref: string) => {
    rawSetColorMode(pref);
    storeUserSetPreference(pref);
    if (pref === colorModes.dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.add("r-dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("r-dark");
    }
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};

export default useColorMode;
