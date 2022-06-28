import books from '@/assets/data/books'
import slugify from 'slugify'

const getBooks = () => books

// const getBookCover = (bookCoverUrl) => {
//   require(`../assets/img/${bookCoverUrl}`)
// }

const getBookCover = (bookTitle) => {
  const slugTitle = slugify(bookTitle, { lower: true, locale: 'vi' })
  return require(`@/assets/img/${slugTitle}.png`)
}

const getPDFFile = (bookTitle) => {
  const slugTitle = slugify(bookTitle, { lower: true, locale: 'vi' })
  return require (`@/assets/file/${slugTitle}.pdf`)
}

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

const getRandomBooks = (size, bookId = null, books = []) => {
  let data = books.length ? books : getBooks()

   data = data.filter(book => {
    if(book.id !== bookId) return book
  })

  for(let i = data.length - 1; i > 0; i--) {
    let randomIdx = Math.floor(Math.random() * (i + 1))

    let temp = data[randomIdx]
    data[randomIdx] = data[i]
    data[i] = temp
  }

  return data.slice(0, size)
}

const getRandomBooksByCategory = (size, bookId, categoryId) => {
  const data = getBooksByCategory(categoryId)

  return getRandomBooks(size, bookId, data)
}

export default () => {
  return {
    getBooks,
    getBookCover,
    getPDFFile,
    getMostDownloadBooks,
    getMostViewBooks,
    getLatestBooks,
    getCustomBookTitle,
    getBookById,
    getBooksByCategory,
    getRandomBooks,
    getRandomBooksByCategory,
  }
}
