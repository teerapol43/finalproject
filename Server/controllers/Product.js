const Product = require("../model/Product");

exports.create = async (req, res) => {
  try {
    console.log(req.body)
    const product = await new Product(req.body).save()
    res.send(product)
  } catch (err) {
    res.status(500).send('Server Error Create Product!!!')
  }
}
exports.list = async (req, res) => {
  try {
    const count = parseInt(req.params.count)
    const product = await Product.find()
      .limit(count)
      .populate('category')
      .sort([["createdAt", "desc"]])
    res.send(product)
  } catch (err) {
    res.status(500).send('Server Error list Product!!!')
  }
}
exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({ _id: req.params.id, })
      .exec()
    res.send(deleted)
  } catch (error) {
    res.status(500).send('Server Error Remove Product!!!')
  }
}
exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, })
      .populate("category")
      .exec()
    res.send(product)
  } catch (error) {
    res.status(500).send('Server Error Read Product!!!')
  }
}
exports.update = async (req, res) => {
  try {
    console.log(req.params.id); // Log product ID
    console.log(req.body); // Log updated data
    const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .exec()
    res.send(product)
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error Update Product!!!');
  }
}
exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body
    const product = await Product.find()
      .limit(limit)
      .populate('category')
      .sort([[sort, order]])
    res.send(product)
  } catch (err) {
    res.status(500).send('Server Error listBy Product!!!')
  }
}
const handleQuery = async (req, res, query) => {
  let products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
  res.send(products)
}
const handlePrice = async (req, res, price) => {
  let products = await Product.find({
    price: {
      $gte: price[0],
      $lte: price[1]
    }
  })
    .populate('category', '_id name')
  res.send(products)
}
const handleCategory = async (req, res, category) => {
  let products = await Product.find({ category })
    .populate('category', '_id name')
  res.send(products)
}
exports.searchFilters = async (req, res) => {
  const { query, price, category } = req.body;
  console.log(query)
  if (query) {
    await handleQuery(req, res, query)
  }
  if (price !== undefined) {
    console.log("price----", price)
    await handlePrice(req, res, price)
  }
  if (category !== undefined) {
    console.log("price----", category)
    await handleCategory(req, res, category)
  }
}
