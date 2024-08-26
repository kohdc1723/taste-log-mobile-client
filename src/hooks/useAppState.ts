import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

export default function useAppState() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isBack, setIsBack] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsBack(true);
      }

      if (appState.current.match(/active/) && (nextAppState === "background")) {
        setIsBack(false);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return { isBack, appStateVisible };
};