// require module
const raspberryPiCamera = require('raspberry-pi-camera-native')

// raspberryPiCamera.on('data', callback(data));

// start capture
raspberryPiCamera.start({
  width: 1280,
  height: 720,
  fps: 30,
  encoding: 'JPEG',
  quality: 75
}, () => {
  console.log('Video streaming started.'.yellow)
})

module.exports = raspberryPiCamera
