import { useEffect, useState } from "react";

let globalState = {};
let listeners = [];
let actions = {};

const useStore = () => {
  const setState = useState(globalState)[1];

  useEffect(() => {
    listeners.push(setState); //runs when a component mounts
    return () => {
      listeners = listeners.filter((listner) => listner !== setState); //runs when the component unmounts
    };
  }, [setState]);
};
