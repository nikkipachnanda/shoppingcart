import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';
import { Outlet } from 'react-router-dom';


const App = () => {
  return (
    <>
    <Header></Header>
    <div>
     <Outlet/>
    </div>
    <Footer></Footer>
    </>
  )
}

export default App
