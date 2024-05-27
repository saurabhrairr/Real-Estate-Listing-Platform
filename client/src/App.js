import React, { useState } from 'react';
import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom";
import Register from './Compontes/Register';
import Loginpage from './Compontes/Loginpage';
import Propertylist from './Compontes/Propertylist';
import SearchBar from './Compontes/SearchBar';
import ContactForm from './Compontes/ContactForm';
import Bottomcpt from './Compontes/Bottomcpt';
import UpdateListingForm from './Compontes/UpdateListingForm';

function App() {

  return (
   <BrowserRouter>
   <Routes>
 
           <Route path="/" element={<Loginpage />} />

   <Route path="Register" element={<Register />} />
   <Route path="PropertyList" element={<Propertylist />} />
   <Route path="SearchBar" element={<SearchBar />} />
   <Route path="ContactForm" element={<ContactForm />} />
   <Route path="Bottomcpt" element={<Bottomcpt />} />
   <Route path="UpdateListingForm" element={<UpdateListingForm />} />
   </Routes>
   
   
   </BrowserRouter>
  )
}

export default App
