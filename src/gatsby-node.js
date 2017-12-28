const axios = require(`axios`)
const parseString = require('xml2js').parseString;

exports.sourceNodes = async ({
  boundActionCreators,
  getNode,
  hasNodeChanged,
},
{
  goodReadsUserId,
  userShelf = '',
  developerKey = ''
}) => {
  const { createNode } = boundActionCreators


  var options = {
    method: `get`,
    url: `https://www.goodreads.com/review/list`,
    params: {
        id: goodReadsUserId,
        shelf: userShelf,
        v: `2`,
        key: developerKey
    }
  }

  // Do the initial fetch
  console.time(`fetch goodreads data`)
  console.log(
    `starting to fetch data from goodreads`
  )
  
  var shelfListXml = await axios(options)

  parseString(shelfListXml, function (err, result) {
    console.log(result)
  })

  return
}