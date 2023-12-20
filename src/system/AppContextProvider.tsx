import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { LightTheme } from '../helpers/Themes';


export const AppContext = React.createContext(null);

export default ({children}) => {
  const [theme, changeTheme] = useState(LightTheme);

  return (
    <AppContext.Provider value={{theme: theme, changeTheme}}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </AppContext.Provider>
  );
};
