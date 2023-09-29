import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';
import { ContextProvider } from './context/usersContext';
import { QueryClientProvider, QueryClient } from 'react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavBar />
        <ContextProvider>
          <Routes>
            <Route path="/" caseSensitive element={<StatisticsPage />} />
            <Route path="users" element={<UsersPage />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
