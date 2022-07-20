import React, {useEffect ,useState, useContext } from 'react'
import styles from './form.module.css'
import Axios from 'axios'
import { Dados } from "../../../global/context";
import { Notas } from '../Notas' 
import { toast } from 'react-toastify';

export function Form() {
  const {userDados} = useContext(Dados);
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [notas, setNotas] = useState([])

  useEffect(verify, [userDados])

  function verify() {
    if (userDados != null) {
      Axios.get('/api/notes/' + userDados.id).then((res) => {
        setNotas(res.data)
      })
    }
  }
  
  function createNote(e) {
    if (userDados != null) {
      e.preventDefault()
      Axios.post('/api/createnote', {
        "title": title,
        "text": text,
        "id_user": userDados.id
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
        Axios.get('/api/notes/' + userDados.id).then((res) => {
          setNotas(res.data)
        })
      })
      setTitle('')
      setText('')
    } else {
      alert('Faça o login primeiro!')
    }
  }

  return (
    <div className={styles.content}>
      <form className={styles.form}> 
        <h1 className={styles.h1}>Criar nova nota</h1>
        <input type="text" className={styles.input_title} onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Título"></input>
        <textarea className={styles.textarea} onChange={(e) => setText(e.target.value)} value={text} placeholder="Conteúdo da nota"></textarea>
        <button type='submit' onClick={createNote} className={styles.button}>Adicionar</button>
      </form>
      <div className={styles.notas}>
        {notas.map((nota) => {
          return (
            <Notas setNotas={setNotas} id={nota.id} title={nota.title} text={nota.text}/>
          )
        })}
      </div>
    </div>
  )
}
