import categories from '@/assets/data/categories'

const getCategories = () => categories

const getCategoryById = (categoryId) => {
  return categories.find(category => category.id == categoryId)
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
  }
}
