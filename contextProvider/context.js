import React, {useState} from 'react';

const AppContext = React.createContext();

export const ValueProvider = ({children}) => {
  const [clickStatas, setClickStatas] = useState(false);

  const getClickStatus = () => {
    console.log('newVal- ');
    setClickStatas(true);
  };
  return (
    <AppContext.Provider value={{data: clickStatas, getClickStatus}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
