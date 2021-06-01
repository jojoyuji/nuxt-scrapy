export default (ctx, inject) =>  {
  try {
    /* eslint-disable-next-line */
    const options = eval(<%=options %>)
    const { jsonPath, entries, headers } = options
    const fetchData = async (name, id) => {
      if(ctx.isDev){
        const entry = entries.find(e => e.name === name)
        const rs = await ctx.$axios.get(`${entry.url}${id  ? '/' + id : ''}`, headers || {})
        return rs.data
      }
      const rs = await ctx.$axios.get(`data/${name}${id ? '--' + id : ''}.json`, headers || {})
      return rs.data
    }

    inject('scrapy',{ fetchData} )
  } catch(e) {
    console.log(e);
  }
}

