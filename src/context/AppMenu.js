import React, { createContext, useState } from "react";

export const AppMenuContext = createContext({});

export const AppMenuProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <AppMenuContext.Provider value={[open, setOpen]}>
      {children}
    </AppMenuContext.Provider>
  );
};
