import React, { createContext, useState} from 'react';

export const Dados = createContext({})

function DadosProvider({children}) {

    const [userDados, setUserDados] = useState(JSON.parse(localStorage.getItem('user')))

    return (
        <Dados.Provider value={{userDados, setUserDados}}>
            {children}
        </Dados.Provider>
    )
}

export default DadosProvider

