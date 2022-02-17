import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  // initial state
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}, // email, password we're not doing anything with that data, but technically we would need it in a real app
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []); // useEffect runs one time because dependencies [] are never changed, that is what we need exactly in this special case

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1"); // '1' means that user is logged in
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider 
    // managing App-wide state
    // value = structure of AuthContext in auth-context.js,  we provide the state to all listening components
    // !Provider part! AuthContext it is not an component itself, but with a dot we can access a preprty of AuthContext object that contains a component
    // so AuthContext.Provider is a component, we wrapping all the components for allowing to listen to  AuthContext, listen we can with
    // Auth-Context consumer or with a React Hook 
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
