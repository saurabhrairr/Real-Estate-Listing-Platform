import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Compontes/Register';
import Loginpage from './Compontes/Loginpage';
import Propertylist from './Compontes/Propertylist';
import SearchBar from './Compontes/SearchBar';
import ContactForm from './Compontes/ContactForm';

import Bottomcpt from './Compontes/Bottomcpt';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/'  element={<Loginpage/>}></Route>
   <Route path="Register" element={<Register />} />
   <Route path="PropertyList" element={<Propertylist />} />
   <Route path="SearchBar" element={<SearchBar />} />
   <Route path="ContactForm" element={<ContactForm />} />
   <Route path="Bottomcpt" element={<Bottomcpt />} />
   </Routes>
   
   
   </BrowserRouter>
  )
}

export default App
