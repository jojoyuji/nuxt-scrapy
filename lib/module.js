const path = require('path')
const fs = require('fs-extra')
const serialize = require('serialize-javascript')
const consola = require('consola')
const logger = consola.withScope('nuxt:scrapy')

const { writeData } = require('./utils')

module.exports = function scrape (moduleOptions) {
  const options = Object.assign({}, this.options.scrapy, moduleOptions)

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: serialize(options)
  })

  const scrapy = async ({ options }) => {
    // if npm run build do not scrap pages
    const scrapyOnlyComponents = !options._generate

    if (!options.scrapy) {
      return false
    }
    const { entries, jsonPath, headers } = options.scrapy || {}

    if (!entries || !entries.length) {
      return false
    }
    // Clean data directory
    fs.emptyDir(jsonPath)

    // logger.debug(`baseURL: ${options.baseURL}`)
    logger.debug(`${jsonPath} folder cleared`)
    logger.debug('Reading endpoints...')
    // writes first layer
    const firstLayer = []
    entries.forEach((entry, index) => {
      if (!(scrapyOnlyComponents && entry.type !== 'component')) {
        firstLayer.push(writeData(`${jsonPath}/${entry.name}.json`, entry.url, index, { headers }, entry.transform))
      }
    })
    const firstLayerData = await Promise.all(firstLayer)
    logger.debug('Loaded & JSON written first layer of endpoints')
    // write second layer
    const secondLayer = []
    await entries.forEach((entry, index) => {
      if (!(scrapyOnlyComponents && entry.type !== 'component')) {
        if (entry.recursive) {
          const subData = firstLayerData[index]
          subData.forEach((data, index) => {
            secondLayer.push(
              writeData(
                `${jsonPath}/${entry.name}--${data.id}.json`,
                `${entry.url}/${data[entry.idKey] || data._id}`,
                index,
                { headers }
              )
            )
          })
        }
      }
    })

    logger.debug('total processing: ')
    logger.debug(secondLayer.length)

    await Promise.all(secondLayer)

    logger.debug('all requests done!')
    logger.debug('json data is ready')
  }
  // Add hook for build
  this.nuxt.hook('build:before', scrapy)
  // this.nuxt.hook('generate:before', scrapy)
}
module.exports.meta = require('../package.json')
