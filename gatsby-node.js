const axios = require(`axios`)
const crypto = require(`crypto`)
const parseString = require('xml2js').parseString

exports.sourceNodes = async ({
  boundActionCreators,
  reporter
},
{
  goodReadsUserId,
  userShelf = '',
  developerKey = ''
}) => {
  const { createNode } = boundActionCreators

  const options = {
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
  const shelfListXml = await axios(options)

  if(shelfListXml.status !== 200) {
    reporter.panic(`gatsby-source-goodreads: Failed API call -  ${shelfListXml}`)
    return
  }

  var shelfReviewId = `reviewList-` + goodReadsUserId

  parseString(shelfListXml.data, function (err, result) {
    if(err) {
      reporter.panic(`gatsby-source-goodreads: Failed to parse API call -  ${err}`)
    } else {
      const reviewListings = result['GoodreadsResponse']['reviews'][0]['review'].map(element => {
        var bookElement = element['book'][0]
  
        var isbnValue = bookElement['isbn'][0]
        var isbn13Value = bookElement['isbn13'][0]      
        if(isNaN(isbnValue)) {
          isbnValue = null
        }
        if(isNaN(isbn13Value)) {
          isbn13Value = null
        }
  
        return {
          reviewID: element['id'][0],
          rating: element['rating'][0],
          votes: element['votes'][0],
          spoilerFlag: element['spoiler_flag'][0],
          spoilersState: element['spoilers_state'][0],
          dateAdded: element['date_added'][0],
          dateUpdated: element['spoilers_state'][0],
          body: element['body'][0],
          book: {
            bookID: bookElement['id'][0]._,
            isbn: isbnValue,
            isbn13: isbn13Value,
            textReviewsCount: bookElement['text_reviews_count'][0]._,
            uri: bookElement['uri'][0],
            link: bookElement['link'][0],
            title: bookElement['title'][0],
            titleWithoutSeries: bookElement['title_without_series'][0],
            imageUrl: bookElement['image_url'][0],
            smallImageUrl: bookElement['small_image_url'][0],
            largeImageUrl: bookElement['large_image_url'][0],
            description: bookElement['description'][0]
          }
        }
      })
  
      createNode({
        shelfName: userShelf,
        reviews: reviewListings,
    
        id: shelfReviewId,    
        parent: null,
        children: [],
        internal: {
          type: `GoodreadsShelf`,
          contentDigest: crypto
            .createHash(`md5`)
            .update('shelf' + goodReadsUserId)
            .digest(`hex`)
        }
      })
    }

  })

  return
}