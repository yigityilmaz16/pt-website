function getClientIp(req) {
  const ip = req.ip || req.socket.remoteAddress || ""

  return ip.replace(/^::ffff:/, "")
}

export default getClientIp