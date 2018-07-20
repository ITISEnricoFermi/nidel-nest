require('./config/config.js')

const colors = require('colors')
const ioClient = require('socket.io-client')
const SerialPort = require('serialport')
const ReadLine = SerialPort.parsers.Readline

const client = ioClient('https://sciencewatching.com', {secure: true, rejectUnauthorized: false, transports: ['websocket', 'flashsocket', 'polling']})

// if (process.env.PORT) {
//   throw new Error('PORT is empty.')
// }

const serial = process.env.PORT

const port = new SerialPort(serial, {
  baudRate: 9600
})

const parser = port.pipe(new ReadLine({
  delimiter: '\r\n'
}))

// Comunicazione con il server web
client.on('connect', () => {
  console.log('Connected to the server.'.green)
})

parser.on('open', () => {
  console.log(`Connection is open on port ${serial}.`.orange)
})

parser.on('data', (data) => {
  let sensArr = data.split(',')
  let datArr = []
  for (let i = 0; i < sensArr.length; i++) {
    datArr[i] = sensArr[i].split(' ')
  }
  console.log(colors.rainbow(data))
  client.emit('data', data)
})

parser.on('error', err => {
  console.log(err)
})

port.on('error', err => {
  console.log(err)
})
