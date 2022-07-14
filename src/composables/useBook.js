import books from '@/assets/data/books'
import slugify from 'slugify'
import moment from 'moment'

moment.locale('vi')

const getBooks = () => books

const getBookCover = (bookTitle) => {
  const slugTitle = slugify(bookTitle, { lower: true, locale: 'vi' })
  return `/img/books/${slugTitle}.png`
}

const getBookUploadTime = (time) => moment(time).fromNow()

const getPDFFile = (bookTitle) => {
  const slugTitle = slugify(bookTitle, { lower: true, locale: 'vi' })
  return `/file/${slugTitle}.pdf`
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

const getBooksById = (booksId) => {
  return booksId.map(id => getBookById(id))
}

const getBooksByCategory = (categoryId) => {
  const data = books.filter(book => book.categoryId === categoryId)
  return data
}

const getRandomBook = () => {
  const randomIdx = Math.floor(Math.random() * books.length)
  return books[randomIdx]
}

const getRandomBooks = (size = null, bookId = null, books = []) => {
  let data = books.length ? books : getBooks()
  let dataSize = size ? size : data.length

  data = data.filter(book => {
    if (book.id !== bookId) return book
  })

  for (let i = data.length - 1; i > 0; i--) {
    let randomIdx = Math.floor(Math.random() * (i + 1))

    let temp = data[randomIdx]
    data[randomIdx] = data[i]
    data[i] = temp
  }

  return data.slice(0, dataSize)
}

const getRandomBooksByCategory = (size, bookId, categoryId) => {
  const data = getBooksByCategory(categoryId)

  return getRandomBooks(size, bookId, data)
}

export default () => {
  return {
    getBooks,
    getBookCover,
    getBookUploadTime,
    getPDFFile,
    getLatestBooks,
    getCustomBookTitle,
    getBookById,
    getBooksById,
    getBooksByCategory,
    getRandomBook,
    getRandomBooks,
    getRandomBooksByCategory,
  }
}
