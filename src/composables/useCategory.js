import categories from '@/assets/data/categories'
import slugify from 'slugify'

const getCategories = () => categories

const getCategoryById = (categoryId) => {
  return categories.find(category => category.id == categoryId)
}

const getCategoryCover = (categoryName) => {
  const categorySlug = slugify(categoryName, { lower: true, locale: 'vi' })
  return require(`@/assets/img/categories/${categorySlug}.png`)
}

const getSortCategory = () => {
  return categories.sort((a, b) => {
    return b.quantity - a.quantity
  })
}

export default () => {
  return {
    getCategories,
    getCategoryById,
    getSortCategory,
    getCategoryCover,
  }
}
