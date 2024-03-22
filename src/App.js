import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar.jsx'; // Import Navbar component only
import Home from './components/Home.jsx';
import AboutUs from './components/AboutUs.jsx';
import Plans from './components/Subscription.jsx'
import ContactUs from './components/ContactUs.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <Router> {/* Wrap your Routes with Router component */}
      <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}


export default App;
