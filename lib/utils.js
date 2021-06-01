import axios from 'axios'
import fs from 'fs-extra'
import consola from 'consola'

const logger = consola.withScope('nuxt:scrapy')

async function getRemote (url, headers = {}) {
  logger.debug('url', url)
  const result = await axios.get(url, headers).catch((e) => {
    logger.debug(e + '\nreq: ' + arguments['0'])
  })
  return result.data
}

export async function stall (stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime))
}

export async function writeData (path, url, index, headers, transformFn) {
  await stall(400 + (index * 400))
  process.stdout.write(`request to ${url} ...`)
  const data = await getRemote(url, headers)
  process.stdout.write(' OK\n')

  let ndata
  if (typeof transformFn === 'function') {
    process.stdout.write('calling transform fn on top of the data received\n')
    ndata = await transformFn(data)
  } else {
    ndata = data
  }
  fs.ensureFileSync(path)
  await fs.writeJson(path, ndata)

  return data
}

export async function readData (path) {
  return await fs.readFileSync(path, 'utf8')
}
