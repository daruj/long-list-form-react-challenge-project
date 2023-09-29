import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactElement,
  Dispatch,
  SetStateAction,
} from 'react';
// import data from '../data/initialUsersData.json';

interface User {
  id: string;
  name: string;
  country: string;
  email: string;
  phone: string;
}

interface UsersContextType {
  usersData: User[];
  setUsersData: Dispatch<SetStateAction<User[]>>;
  loading: boolean;
}

// initial value
const UsersContext = createContext<UsersContextType>({
  usersData: [],
  setUsersData: () => {},
  loading: false,
});

interface ContextProviderProps {
  children: ReactElement;
}

// value provider
export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading] = useState(false);

  console.log('usersData', usersData);

  useEffect(() => {
    const t = setTimeout(() => {
      // setUsersData(data);
    }, 2000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const contextValue = useMemo(() => ({ usersData, setUsersData, loading }), [usersData]);

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
