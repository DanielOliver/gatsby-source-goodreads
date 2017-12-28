const axios = require(`axios`)

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

  var shelfList = await axios(options)

  // Do the initial fetch
  console.time(`fetch goodreads data`)
  console.log(
    `starting to fetch data from goodreads`
  )

  return
}