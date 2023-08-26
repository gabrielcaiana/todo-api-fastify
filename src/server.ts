import Fastify, { FastifyInstance } from 'fastify'
import { routes } from './routes'

const server: FastifyInstance = Fastify({
  logger: true,
})

server.register(routes)

const start = async () => {
  try {
    await server.listen({
      port: process.env.PORT ? Number(process.env.PORT) : 3333,
    })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port
    console.log(`Server is running in ${port} 🚀`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
