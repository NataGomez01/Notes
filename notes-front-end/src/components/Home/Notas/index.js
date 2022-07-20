import React, { useContext } from 'react'
import styles from './notas.module.css'
import Axios from 'axios'
import { Dados } from "../../../global/context";
import { toast } from 'react-toastify';

export function Notas({id, title, text, setNotas}) {
    const {userDados} = useContext(Dados);

    function excluir() {
        toast.success('Nota excluida!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        Axios.post('/api/delete', {
            "id": id
        }).then((res) => {
            Axios.get('/api/notes/' + userDados.id).then((res) => {
                setNotas(res.data)
            })
        })
    }

    return (
        <div className={styles.nota} key={title}>
            <h2 className={styles.h2notas}>{title}</h2>
            <p className={styles.pnotas}>{text}</p>
            <button className={styles.delete} onClick={excluir}>X</button>
        </div>
    )
}

