import React, { useContext, useState } from "react";

import { createContext } from "react";

const StateContext = createContext({
  state: [],
  setState: () => {},
});

export const useStateContext = () => useContext(StateContext);

const StateProvider = ({ children }) => {
  const [state, setState] = useState([]);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;