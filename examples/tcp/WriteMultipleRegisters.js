'use strict'

const modbus = require('../..')
const net = require('net')
const socket = new net.Socket()
const options = {
  'host': '127.0.0.1',
  'port': '8502'
}
const client = new modbus.client.TCP(socket)

socket.on('connect', function () {
  client.writeMultipleRegisters(1, [0x000a, 0x0102])
    .then(function (resp) {
      console.log(resp)
      socket.end()
    }).catch(function () {
      console.error(arguments)
      socket.end()
    })
})

socket.on('error', console.error)
socket.connect(options)
