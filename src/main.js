import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { registerUser, loginUser } from './db.js'

const app = express()

app.use(express.json())

app.use(bodyParser.json())

app.use(cors())

const port = 5000

app.get('/', async (req, res) => {
  res.send('Hello world from API!')
})

app.post('/register', async (req, res) => {
  const { username, password_md5, email } = req.body
  console.log(req.body)

  try {
    await registerUser(username, password_md5, email)
    res.status(200).json({ status: 'success', message: 'User registered succesully.' })
  } catch (error) {
    res.status(500).json({ status: 'failed', error: error.message })
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body // Recibe la contraseña en texto plano

  try {
    // Aplica MD5 en el servidor, no confíes en que el cliente lo haya hecho
    const user = await loginUser(username, password)
    if (user) {
      res
        .status(200)
        .json({ status: 'success', message: 'User logged in successfully', data: user })
    } else {
      // Si no se encuentra el usuario, envía un error de credenciales incorrectas
      throw new Error('Invalid username or password')
    }
  } catch (error) {
    res.status(401).json({ status: 'failed', message: 'Invalid username or password' })
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
