import React, { useState} from 'react'
import styles from './form.module.css'
import Axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export function Form() {
    const navigate = useNavigate();
    const [textNome, setTextNome] = useState('')
    const [textEmail, setTextEmail] = useState('')
    const [textSenha, setTextSenha] = useState('')
    const [show, setShow] = useState(true)

    async function cadastrar(e) {
      e.preventDefault()
      if (textNome.length < 4 || textEmail.length < 10 || textSenha.length < 8) {
        toast.error('Preencha todos os campos', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } else {
        await Axios.post('/api/cadastrar', {
          "nome": textNome,
          "email": textEmail,
          "senha": textSenha,
        }).then((res) => {
          toast.success(res.data.msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          navigate("/login")
        })
        setTextNome('')
        setTextEmail('')
        setTextSenha('')
      }
    }

    function showPass() {
      setShow(!show)
    }

  return (
    <div className={styles.content}>
      <form className={styles.form}> 
        <h1 className={styles.h1}>Cadastro</h1>
        <input type="text" className={styles.input_title} onChange={(e) => {setTextNome(e.target.value)}} value={textNome} placeholder="nome"></input>
        <input type="text" className={styles.input_title} onChange={(e) => {setTextEmail(e.target.value)}} value={textEmail} placeholder="Email"></input>
        <input type={show ? "password" : "text"} className={styles.input_title} onChange={(e) => {setTextSenha(e.target.value)}} value={textSenha} placeholder="Senha"></input>
        <img src={show ? "/image/eyeClosed.svg" : "/image/eye.svg"} alt='closed' className={styles.img} onClick={showPass}></img>
        <button type='submit' onClick={cadastrar}  className={styles.button}>Cadastrar</button>
      </form>
    </div>
  )
}