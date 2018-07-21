require('./config/config.js')

const ioClient = require('socket.io-client')
const SerialPort = require('serialport')
const ReadLine = SerialPort.parsers.Readline
const colors = require('colors')

const client = ioClient('https://live.sciencewatching.com', {
  secure: true,
  rejectUnauthorized: false,
  transports: ['websocket', 'flashsocket', 'polling']
})

// if (process.env.PORT) {
//   throw new Error('PORT is empty.')
// }

const serial = process.env.PORT

const port = new SerialPort(serial || '/dev/ttyUSB0', {baudRate: 9600})

const parser = port.pipe(new ReadLine({delimiter: '\r\n'}))

// Comunicazione con il server web
client.on('connect', () => {
  console.log('Connected to the server.'.green)
})

parser.on('open', () => {
  console.log(`Connection is open on port ${serial}.`.orange)
})

parser.on('data', (data) => {
  data = data.split(':')
  let type = data[0]
  let value = data[1]

  switch (type) {
    case 't':
      console.log('Temperature:', value)
      client.emit('temperature', value)
      break
    case 'h':
      console.log('Humidity:', value)
      client.emit('humidity', value)
      break
  }
})

parser.on('error', err => {
  console.log(err)
})

port.on('error', err => {
  console.log(err)
})
