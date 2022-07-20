const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv/config')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    res.send('Inicio')
})

router.post('/api/cadastrar', async (req, res) => {
    const { nome, email, senha} = req.body

    const hashSenha = await bcrypt.hash(senha, 8)
    
    const result = await prisma.User.findMany({
        where: {
          email: email,
          name: nome  
        }
    })

    if (result.length > 0) {
        return res.send({msg: 'Usuario já cadastrado'})
    } else {
        await prisma.User.create({
            data: {
                name: nome,
                email: email,
                senha: hashSenha
            },
          })
        return res.send({msg:'Usuario Cadastrado com sucesso!'})
    }
})

router.post('/api/login', async (req, res) => {
    const { email, senha } = req.body

    const result = await prisma.User.findMany({
        where: {
          email: email
        }
    })
    
    if (result.length > 0) {
        bcrypt.compare(senha, result[0].senha, function(err, igual) {
            if (err) {
                throw err
            } else if (!igual) {
                res.send({status: "Dados incorretos!"})
            } else {
                const token = jwt.sign({id: result[0].id}, process.env.TOKEN_PASS, {
                    expiresIn: '1d'
                })
                res.send({status: true, msg: 'Usuario logado com sucesso!', result: result, token: token}) 
            }
        })
    }
    
    if (result.length === 0) {
        res.send({status: "Dados incorretos"})
    }

})

router.post('/api/createnote', async (req, res) => {
    const {title, text, id_user} = req.body

    await prisma.Notes.create({
        data: {
          title: title,
          text: text,
          id_user: id_user
        },
      })
    
    return res.send({msg:'Nota criada'})
})

router.get('/api/notes/:id', async (req, res) => {

    const result = await prisma.Notes.findMany({
        where: {
            id_user: +req.params.id
        }
    })
    res.send(result)
})

router.post('/api/delete', async (req, res) => {
    const { id } = req.body
    const result = await prisma.Notes.delete({
        where: {
          id: id,
        },
    })
    res.send(result)
})


module.exports = router