
function useBook() {

  const getBookCover = (bookCoverUrl) => require(`../assets/img/${bookCoverUrl}`)

  const getMostDownloadBooks = (books, size) => {
    const data = books.sort((a, b) => {
      return b.downloads - a.downloads
    })

    return data.slice(0, size)
  }

  const getMostViewBooks = (books, size) => {
    const data = books.sort((a, b) => {
      return b.views - a.views
    })

    return data.slice(0, size)
  }

  const getLatestBooks = (books, size) => {
    const data = books.sort((a, b) => {
      return Date.parse(b.uploadedAt) - Date.parse(a.uploadedAt)
    })

    return data.slice(0, size)
  }

  const getCustomBookTitle = (title) => {
    if(title.length > 25) return title.substring(0, 25) + '...'
    return title
  }

  const getBooksByCategoryId = (books, categoryId) => {
    const data = books.filter(book => book.categoryId === categoryId)
    return data
  }

  return {
    getBookCover,
    getMostDownloadBooks,
    getMostViewBooks,
    getLatestBooks,
    getCustomBookTitle,
    getBooksByCategoryId,
  }
}

export default useBook
