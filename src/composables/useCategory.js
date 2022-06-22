import categories from '@/assets/data/categories'

const getCategories = () => categories

const getCategoryById = (categoryId) => {
  return categories.find(category => category.id == categoryId)
}

export default () => {
  return {
    getCategories,
    getCategoryById,
  }
}
