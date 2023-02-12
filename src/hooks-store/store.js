import { useEffect, useState } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier) => {
    const newState = actions[actionIdentifier](globalState);
    globalState = { ...globalState, ...newState };

    for (const listener in listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState); //runs when a component mounts
    return () => {
      listeners = listeners.filter((listner) => listner !== setState); //runs when the component unmounts
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, initialState };
  }
  actions = { ...actions, ...userActions };
};
