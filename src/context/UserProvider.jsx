import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useState,useEffect } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  //LOGICA DE ACCESO

  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
        if(user){
            const {email,displayName,uid} = user
            setUser({email,displayName,uid})
        }else{
            setUser(null)
        }
    })

    return () => unsubscribe();
  }, []);

  const registerUser = (email,password) => createUserWithEmailAndPassword(auth, email,password)

  const loginUser = (email,password) => signInWithEmailAndPassword(auth, email,password)

  const logoutUser = () => signOut(auth);



  return (
    <UserContext.Provider value={{ user, registerUser, setUser, loginUser,logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
