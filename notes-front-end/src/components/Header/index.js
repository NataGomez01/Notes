import React, { useContext } from 'react'
import styles from './header.module.css'
import { Link } from 'react-router-dom'
import { Dados } from "../../global/context";

export function Header() {

  const {userDados, setUserDados} = useContext(Dados);

  async function exitUser () {
    await localStorage.removeItem('user')
    setUserDados(null)
  }

  return (
    <>
      <header className={styles.header}>
          <div className={styles.content}>
              <h1 className={styles.h1}><Link to="/">Note App 📔</Link></h1>
              {userDados === null ? 
                <>
                  <Link to="/cadastro"><button className={styles.sign_up}>Cadastrar</button></Link>
                  <Link to="/login"><button className={styles.sign_in}>Login</button></Link>
                </>
                :
                <>
                  <h1>{userDados.name}</h1>
                  <Link to="/login"><button className={styles.sign_in} onClick={exitUser}>Sair</button></Link>
                </>
              }
          </div>
      </header>
    </>    
  )
}




