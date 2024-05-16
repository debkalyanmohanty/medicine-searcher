import {Box} from '@mui/material';
import * as React from 'react';
import './App.css'
import Home from './pages/Home';

function App() {
  const [salts , setSalts] = React.useState([]);
  return (
    <Box>
      <Home salts={salts} setSalts={setSalts}/>
    </Box>
  )
}

export default App
