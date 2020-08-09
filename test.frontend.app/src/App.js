import React from 'react';
import './App.css';
import OrderList from './components/order/order-list';
import HomeRouter from './routes';

function App() {
  return (
    <div className="App">
      <HomeRouter></HomeRouter>
    </div>
  );
}

export default App;
