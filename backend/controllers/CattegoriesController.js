const { where } = require('sequelize');
const {Category} = require('../models/index')

class CategoryController {
static async readCategory(req,res,next){
    try {
    const categories = await Category.findAll()
    
    res.status(200).json({
        message : "Success read Category",
        categories
    })
    } catch (error) {
      console.log(error);
      next(error)
    }
}

static async addCategory(req,res,next){
  try {
    const {name} = req.body
    const categories = await Category.create({name})

    res.status(201).json({
      message: "Success create categories",
      categories
  })

  } catch (error) {
    console.log(error);
    next(error)
  }
}

static async deleteCategory(req,res,next){
  try {
    const {id} = req.params
    const categories = await Category.findByPk(id)
    
    if(!categories) throw ({ name : "Article Not Found" ,id})
    
    await Category.destroy ({
      where : {
        id
      }
    })

    res.status(200).json({
      message: `Success Delete Product with id ${id}`
  })

  } catch (error) {
    console.log(error);
    next(error)
  }
}

static async editCategory(req,res,next){
  try {
    const {id} = req.params
    const categories = await Category.findByPk(id)

    if(!categories) throw ({name : "Category Not Found", id})
    
    const {name} = req.body

    await Category.update({name}, {
      where : {
        id
      }
    })

    res.status(200).json({
      message: `Success edit Category with id ${id}`
  })
  } catch (error) {
    console.log(error);
    next(error)
  }
    
  }
}


module.exports = CategoryController