import React from 'react';
import './App.css';
import Header from './layout/header';
import Footer from './layout/footer';
import AppRoutes from './routes/routes';

function App() {
  return (
    <div className="w-100 overflow-hidden h-100 d-flex flex-column align-content-center align-items-center justify-content-center">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
