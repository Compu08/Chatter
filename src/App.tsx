import React from 'react';
import './App.css';
import Header from './layout/header';
import Footer from './layout/footer';
import AppRoutes from './routes/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAppDispatch } from './redux/hooks';
import { setIsAllowedExpand } from './redux/chatsSlice';

function App() {

  const queryClient = new QueryClient();
  const dispatch = useAppDispatch();

  const handleBodyClick = (e:React.MouseEvent<HTMLDivElement>) => {
    dispatch(setIsAllowedExpand(false))
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div onClick={handleBodyClick} className="w-100 overflow-hidden h-100 d-flex flex-column align-content-center align-items-center justify-content-center">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
