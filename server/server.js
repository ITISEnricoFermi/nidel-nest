require('./config/config.js')

// const camera = require('./lib/camera')
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
  let time = new Date().toLocaleTimeString()

  switch (type) {
    case 't_int':
      console.log(colors.yellow(time), 'Internal temperature:'.magenta, value)
      client.emit('temperature_internal', value)
      break
    case 't_ext':
      console.log(colors.yellow(time), 'External temperature:'.magenta, value)
      client.emit('temperature_external', value)
      break
    case 'h_int':
      console.log(colors.yellow(time), 'Internal humidity:'.cyan, value)
      client.emit('humidity_internal', value)
      break

    case 'h_ext':
      console.log(colors.yellow(time), 'External humidity:'.cyan, value)
      client.emit('humidity_external', value)
      break
    case 'b_int':
      console.log(colors.yellow(time), 'Internal lum:'.red, value)
      client.emit('lum_internal', value)
      break
    case 'b_ext':
      console.log(colors.yellow(time), 'External lum:'.red, value)
      client.emit('lum_external', value)
      break
    case 'g':
      console.log(colors.yellow(time), 'Gas:'.red, value)
      client.emit('g', value)
      break
  }
})

// camera.on('frame', frame => {
//   client.emit('camera', frame)
// })

parser.on('error', err => {
  console.log(err)
})

port.on('error', err => {
  console.log(err)
})
