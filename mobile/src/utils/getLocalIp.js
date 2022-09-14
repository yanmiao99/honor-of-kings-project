const os = require('os')

function getNetworkIp () {
  let needHost = '' // 打开的host
  try {
    // 获得网络接口列表
    const network = os.networkInterfaces()
    for (const dev in network) {
      const face = network[dev]
      for (let i = 0; i < face.length; i++) {
        const alias = face[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          needHost = alias.address
          // console.log('alias.address', alias.address)
        }
        // console.log('alias', alias)
      }
    }
  } catch (e) {
    needHost = 'localhost'
  }
  return needHost
}

export default getNetworkIp()
