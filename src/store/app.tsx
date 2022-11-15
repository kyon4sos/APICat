import React, { Dispatch, PropsWithChildren, useContext, useReducer } from "react";

export type Lang = "zhCN" | "en";

type AppContextType = {
  lang: Lang;
  dispatch: Dispatch<Action>;
  theme: {
    primaryColor: string;
  };
};

const initState = {
  lang: "cn" as any,
  theme: {
    primaryColor: "#57013c",
  },
};

const AppContext = React.createContext<AppContextType>({} as any);

type Action = { type: "Set-Lang"; payload: string } | { type: "Set-Theme"; payload: object };

const reducer = (state: typeof initState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "Set-Lang": {
      return {
        ...state,
        lang: payload,
      };
    }
    case "Set-Theme": {
      return {
        ...state,
        theme: payload,
      };
    }
  }
};

const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return <AppContext.Provider value={{ ...state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, useAppContext };
