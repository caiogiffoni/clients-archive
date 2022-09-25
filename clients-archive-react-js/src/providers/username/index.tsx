// fazer os imports
import { createContext, useContext, useEffect, useState } from "react";
import { IUserContextProps, IUserContextType } from "../../interface/user";
// import api from "../../services";

const initialValue = {
  username: JSON.parse(localStorage.getItem("@CA:username") as string),
  setUsername: () => {},
  refreshUsername: () => {},
};

// criar o context
export const UserContext = createContext(initialValue as IUserContextType);

// criar o provider
export const UserProvider = ({ children }: IUserContextProps) => {
  const [username, setUsername] = useState(initialValue.username);

  const refreshUsername = () => {
    // api
    //   .get(`users/${user.id}`)
    //   .then((res) => setUser(res.data))
    //   .catch((e) => console.log(e));
  };

  return (
    <UserContext.Provider value={{ username, setUsername, refreshUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsername = () => useContext(UserContext);
