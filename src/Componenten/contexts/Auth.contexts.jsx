export const useAuth = () => useContext(AuthContext);

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import useSWRMutation from "swr/mutation";
import * as api from "../../api/index.js";

const JWT_TOKEN_KEY = "jwtToken";
const GEBRUIKER_ID_KEY = 'idGebruiker'; // 👈 13
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [gebruiker, setGebruiker] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    api.setAuthToken(token);
    setIsAuthed(Boolean(token)); 
    setReady(true);
  }, [token]);
  
  const { isMutating: loading, trigger: doLogin } = useSWRMutation(
    "Gebruiker/login",
    api.post
  );

  const {
    trigger: doRegister,
  } = useSWRMutation('Gebruiker/register', api.post)


  const setSession = useCallback(
    (token, user) => {
      setToken(token);
      setGebruiker(user);

      localStorage.setItem(JWT_TOKEN_KEY, token);
      localStorage.setItem(GEBRUIKER_ID_KEY, user.idGebruiker);
    },
    [],
  );

 

  const login = useCallback(
    async (email, password) => {
      try {
        // 👇 7
        const { token, user } = await doLogin({
          email,
          password,
        });

        setToken(token); // 👈 8
        setGebruiker(user); // 👈 8

        localStorage.setItem(JWT_TOKEN_KEY, token); // 👈 13
        localStorage.setItem(GEBRUIKER_ID_KEY, user.idGebruiker); 

        return true; // 👈 10
        // 👇 10
      } catch (error) {
        throw new Error('Foute login gegevens');
      }
    },
    [doLogin]
  );
  
 

  const register = useCallback(
    async (data) => {
      try {
        const { token, user } = await doRegister(data);
        console.log(user); // Log the user object
        setSession(token, user);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister, setSession],
  );
 


  const logOut = useCallback(() => {
    try {
      setToken(null);
      setGebruiker(null);

      localStorage.removeItem(JWT_TOKEN_KEY);
      localStorage.removeItem(GEBRUIKER_ID_KEY);
      return true;
    } catch (error) {
      console.error("Error during logOut:", error);
      return false;
    }
  }, [setToken, setGebruiker]);

  const getAfspraken = useCallback(async () => {
    try {
      console.log(
        "Attempting ophalen van Afspraken voor gebruiker"
      );
      const response = await api.get(`/api/afspraken/`);
      if (response) {
        return response.items;
      }
    } catch (error) {
      console.error("Error during ophalen van Afspraken:", error);
      return false;
    }
  }, []);



  
  const value = useMemo(
    () => ({
      token,
      gebruiker,
      ready,
      loading,
      isAuthed,
      login,
      logOut,
      getAfspraken,
      register,
    }),
    [token, gebruiker, ready, loading, isAuthed, login, logOut, getAfspraken,]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
