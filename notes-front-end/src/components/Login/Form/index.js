import React, { useContext, useState } from 'react'
import styles from './form.module.css'
import Axios from 'axios'
import { Dados } from "../../../global/context";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'


export function Form() {
  const navigate = useNavigate();
  const [textEmail, setTextEmail] = useState('')
  const [textSenha, setTextSenha] = useState('')
  const [show, setShow] = useState(true)
  const {setUserDados} = useContext(Dados);

  function logar(e) {
    e.preventDefault()
    if (textEmail === '' || textSenha === '') {
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
      Axios.post('/api/login', {
        "email": textEmail,
        "senha": textSenha
      }).then((res) => {
        if (res.data.status === true) {
          setUserDados(res.data.result[0])
          toast.success(res.data.msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          localStorage.setItem('user', '')
          localStorage.setItem('user', JSON.stringify(res.data.result[0]))
          localStorage.setItem('token', res.data.token)
          navigate("/")
        } else {
          toast.error(res.data.msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      })
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
        <h1 className={styles.h1}>Login</h1>
        <input type="text" className={styles.input_title} onChange={(e) => {setTextEmail(e.target.value)}} value={textEmail} placeholder="Email"></input>
          <input type={show ? "password" : "text"} className={styles.input_title} onChange={(e) => {setTextSenha(e.target.value)}} value={textSenha} placeholder="Senha"></input>
          <img src={show ? "/image/eyeClosed.svg" : "/image/eye.svg"} alt='closed' className={styles.img} onClick={showPass}></img>
        <button type='submit' onClick={logar}  className={styles.button}>Login</button>
      </form>
    </div>
  )
}