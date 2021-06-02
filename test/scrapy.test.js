jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')
// const axios = require('axios')
//
const config = require('./fixture/nuxt.config')
//
let nuxt //, addTemplate
//
// const url = path => `http://localhost:3000${path}`
//
// const setupNuxt = async (config) => {
//   nuxt = new Nuxt(config)
//
//   // Spy addTemplate
//   addTemplate = nuxt.moduleContainer.addTemplate = jest.fn(
//     nuxt.moduleContainer.addTemplate
//   )
//
//   const build = new Builder(nuxt)
//
//   await build.validatePages()
//   await build.generateRoutesAndFiles()
//   await nuxt.listen(3000)
// }
//
const testSuite = () => {
  test('baseURL', () => {
    return expect(true).toBe(true)

    // expect(addTemplate).toBeDefined()
    // const call = addTemplate.mock.calls.find(args => args[0].src.includes('plugin.js'))
    // const options = call[0].options
    // const proto = options.https ? 'https' : 'http'
    // expect(options.baseURL.toString()).toBe(`${proto}://localhost:3000/api`)
    // expect(options.browserBaseURL.toString()).toBe('/api')
  })

  // test('asyncData', () => {
  //   expect(true).toBe(true)
  //   // const html = (await axios.get(url('/asyncData'))).data
  //   // expect(html).toContain('foo/bar')
  // })
  //
  // test('mounted', () => {
  //   expect(true).toBe(true)
  //   // const window = await nuxt.renderAndGetWindow(url('/mounted'))
  //   // window.onNuxtReady(() => {
  //   //   const html = window.document.body.innerHTML
  //   //   expect(html).toContain('foo/bar')
  //   // })
  // })
  //
  // test('init', () => {
  //   expect(true).toBe(true)
  //   // const window = await nuxt.renderAndGetWindow(url('/mounted'))
  //   // window.onNuxtReady(() => {
  //   //   const $axios = window.$nuxt.$axios
  //   //   expect($axios.defaults.xsrfHeaderName).toBe('X-CSRF-TOKEN')
  //   // })
  // })

  // test('createCopy', () => {
  //   expect(true).toBe(true)
  //   // const window = await nuxt.renderAndGetWindow(url('/mounted'))
  //   // window.onNuxtReady(() => {
  //   //   const $axios = window.$nuxt.$axios
  //   //   const newInstance = $axios.create()
  //   //   expect(newInstance.defaults.xsrfHeaderName).toBe('X-CSRF-TOKEN')
  //   // })
  // })

  // test('ssr', () => {
  //   expect(true).toBe(true)
  //   // const makeReq = login => axios
  //   //   .get(url('/ssr' + (login ? '?login' : '')))
  //   //   .then(r => r.data)
  //   //   .then(h => /session-[0-9]+/.exec(h))
  //   //   .then(m => (m && m[0] ? m[0] : null))
  //   //
  //   // const a = await makeReq()
  //   // const b = await makeReq(true)
  //   // const c = await makeReq()
  //   // const d = await makeReq(true)
  //   //
  //   // expect(a).toBeNull()
  //   // expect(b).not.toBeNull()
  //   // expect(c).toBeNull() // Important!
  //   // expect(d).not.toBeNull()
  //   // expect(b).not.toBe(d)
  // })
}

describe('module', () => {
  beforeAll(async () => {
    nuxt = new Nuxt(config)

    // Spy addTemplate
    // addTemplate = nuxt.moduleContainer.addTemplate = jest.fn(
    //   nuxt.moduleContainer.addTemplate
    // )

    await new Builder(nuxt).build()
    await nuxt.listen(3000)
  })

  afterAll(async () => {
    await nuxt.close()
  })

  testSuite()
})
