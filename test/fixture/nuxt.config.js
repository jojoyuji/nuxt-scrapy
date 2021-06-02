import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import filter from 'lodash/filter'

const { resolve } = require('path')

const configTransform = (data) => {
  return data
}

const itemsTransform = (data) => {
  return filter(orderBy(
    map(data.records, (i) => { return { ...i.fields, id: i.id } })
    , ['order'], ['asc']), i => i.visible)
}

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [
    { handler: require('../../') }
  ],
  serverMiddleware: {
    '/api/echo': '~/api/echo',
    '/api/cookie': '~/api/cookie'
  },
  // axios: {
  //   prefix: '/api',
  //   proxy: true,
  //   credentials: true,
  //   debug: true,
  //   retry: true
  // },
  scrapy: {
    jsonPath: 'assets/data',
    headers: {
      Authorization: 'Bearer token'
    },
    entries: [
      {
        name: 'todos',
        type: 'component',
        url: 'https://jsonplaceholder.typicode.com/todos',
        transform: itemsTransform
      },
      {
        name: 'todoItem',
        type: 'component',
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        transform: configTransform
      }
    ]
  }
  // plugins: ['~/plugins/axios']
  // plugins: []
}
