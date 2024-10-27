import React from 'react';
import Header from './components/header';
import ProductList from './components/Productlist';
import Features from './components/Features';
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div>
            <Header />
            <ProductList/>
            <Features/>
            <Footer />
        </div>
    );
}

export default App;

