import books from '@/assets/data/books'


const getBooks = () => books

const getBookCover = (bookCoverUrl) => require(`../assets/img/${bookCoverUrl}`)

const getMostDownloadBooks = (size) => {
  const data = books.sort((a, b) => {
    return b.downloads - a.downloads
  })

  return data.slice(0, size)
}

const getMostViewBooks = (size) => {
  const data = books.sort((a, b) => {
    return b.views - a.views
  })

  return data.slice(0, size)
}

const getLatestBooks = (size) => {
  const data = books.sort((a, b) => {
    return Date.parse(b.uploadedAt) - Date.parse(a.uploadedAt)
  })

  return data.slice(0, size)
}

const getCustomBookTitle = (title) => {
  if (title.length > 25) return title.substring(0, 25) + '...'
  return title
}

const getBookById = (bookId) => {
  return books.find(book => book.id == bookId)
}

const getBooksByCategory = (categoryId) => {
  const data = books.filter(book => book.categoryId === categoryId)
  return data
}

const getRandomBooksByCategory = (size, bookId, categoryId) => {
  let data = []
  const books = getBooksByCategory(categoryId)

  let i = 0;

  while(true) {
    if(i == size) break;

    let randomNumber = Math.floor(Math.random() * size)

    if(randomNumber == bookId) continue

    data.push(books[randomNumber])
    
    i++
  }

  return data
}

export default () => {
  return {
    getBooks,
    getBookCover,
    getMostDownloadBooks,
    getMostViewBooks,
    getLatestBooks,
    getCustomBookTitle,
    getBookById,
    getBooksByCategory,
    getRandomBooksByCategory,
  }
}
