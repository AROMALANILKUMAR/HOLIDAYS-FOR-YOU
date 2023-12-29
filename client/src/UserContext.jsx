import {createContext, useEffect, useState} from "react";
import { fetchUser } from "./apiCalls/userApi";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  async function getUser(){
    const res = await fetchUser()
    setUser(res.data)
  }
  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, []);
  return (
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  );
}