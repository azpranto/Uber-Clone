import { createContext, useState } from 'react'

export const UserDataContext = createContext();

const UsrContext = ({children}) => {

  const [user, setUser] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: ""
    }
  });
  
  return (
    <div>
      <UserDataContext.Provider value={{user, setUser}}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UsrContext