# gatsby-plugin-goodreads

Source plugin for pulling your read books into Gatsby from Goodreads API.

## How to use
```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-goodreads",
      options: {
        developerKey: "IAmDeveloperKey",
        goodReadsUserId: "IAmGoodreadsUserId",
        userShelf: "to-read" //optional
      }
    }
  ],
}
```

## Plugin options

* **developerKey**: Use your [Goodreads developer API key](https://www.goodreads.com/api/keys)
* **goodReadsUserId**: The Goodreads user ID of the user to get data for.
* **userShelf**: _OPTIONAL_. read, currently-reading, to-read, etc.

## How to query your Goodread data using GraphQL

Below is a sample query for fetching the shelf's books. 

```graphql
query shelfList {
  allGoodreadsShelf {
    edges {
      node {
        id
        shelfName
        reviews {
          reviewID
          rating
          votes
          spoilerFlag
          spoilersState
          dateAdded
          dateUpdated
          book {
            bookID
            textReviewsCount
            isbn
            isbn13
            uri
            title
            titleWithoutSeries
          }
        }
      }
    }
  }
}

```
