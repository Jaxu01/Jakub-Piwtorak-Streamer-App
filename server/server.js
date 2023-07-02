const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client')
const http = require('http')
const { Server } = require("socket.io")
const app = express()
const port = 3000
const prisma = new PrismaClient()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/streamers', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const streamers = await prisma.streamer.findMany()
  res.json(streamers)
})

app.post('/streamers', async (req, res) => {
  await prisma.streamer.create({
    data: {
      name: req.body.streamer_name,
      description: req.body.streamer_description,
      platform: req.body.streaming_platform,
      image: "defaultimage.png",
      upvotes: 0,
      downvotes: 0
    }
  })
})

app.put('/streamer/:streamerId/vote', async (req, res) => {
  const streamerId = Number(req.params.streamerId)
  const vote = {}
  if (req.body.type === "dislike") {
    vote.downvotes = {increment: 1}
  }
  else if (req.body.type === "like") {
    vote.upvotes = {increment: 1}
  }
  const streamer = await prisma.streamer.update({
    where: {
      id: streamerId
    },
    data: vote
  })
  io.emit('voteupdate', streamer)
  res.json(streamer)
})

app.get('/streamer/:streamerId', async (req, res) => {
  const streamerId = Number(req.params.streamerId)
  const response = await prisma.streamer.findFirst({
    where: {
      id: streamerId
    }
  })
  res.json(response)
})

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
})

server.listen(port)
