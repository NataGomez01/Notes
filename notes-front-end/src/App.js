import React from 'react'
import styles from "./global/style.module.css"
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Cadastro from "./routes/cadastro";
import Login from "./routes/login";
import { Header } from './components/Header'
import DadosProvider from './global/context';
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <div className={styles.app}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <DadosProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Home />} />
      </Routes>
      </DadosProvider>
    </div>
  );
}

export default App;
