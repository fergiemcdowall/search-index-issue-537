(async function() {
  const fs = require('fs')
  const si = require('search-index')
  const memdown = require('memdown')

  const { PUT, QUERY } = await si({
    db: memdown('journals')
  })

  const batch = fs.readdirSync('journals').map(
    j => JSON.parse(fs.readFileSync('journals/' + j))
  )
  
  await PUT(batch)

  console.log(JSON.stringify(await QUERY({
    OR: ['dag', 'emmey', 'dorie', 'cordell', 'gregoire']
  }), null, 2))
  
}())
