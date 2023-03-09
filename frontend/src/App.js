import React from 'react';
import Router from './components/Router.component';
import { UserContextProvider } from './contexts/UserContext';

function App() 
{
  return (
    <UserContextProvider>
      <Router/>
    </UserContextProvider>
  );
}

export default App;
