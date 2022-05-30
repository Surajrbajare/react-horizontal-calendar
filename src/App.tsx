import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import HorizontalDatePicker from './Container/HorizontalDatePicker';

function App() {

  const isTaskSet = (selectedDate: any) => {
    alert('selected Date' + selectedDate)
  }

  return (
    <ChakraProvider>
      <div className="App">
        <HorizontalDatePicker datepickerEventHandler={isTaskSet} />
      </div>
    </ChakraProvider>
  );
}

export default App;
