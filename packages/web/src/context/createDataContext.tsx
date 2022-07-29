import React, { useReducer } from 'react';

export default (reducer: any, action: any, defaultValue: any) => {
  const Context = React.createContext(null);

  const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions: any = {};

    for (let key in action) {
      boundActions[key] = action[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context: Context, Provider: Provider };
};
