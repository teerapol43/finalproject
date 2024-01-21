const Category = require('../model/Category')

exports.list = async (req, res) => {
    try {
        const category = await Category.find({}).exec()
        res.send(category)
    } catch (error) {
        res.status(500).send('Server Error list Category!!!')
    }
}
exports.create = async (req, res) => {
    try {
        console.log(req.body)
        const { name } = req.body;
        const category = await new Category({ name }).save()
        res.send(category)
    } catch (error) {
        res.status(500).send('Server Error Create Category!!!')
    }
}
exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOne({ _id: id })
        res.send(category)
    } catch (error) {
        res.status(500).send('Server Error read Category!!!')
    }
}
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const category = await Category.findOneAndUpdate({ _id: id }, { name: name }).exec()
        res.send(category)
    } catch (error) {
        res.status(500).send('Server Error update Category!!!')
    }
}
exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOneAndDelete({ _id: id }).exec()
        res.send(category)
    } catch (error) {
        res.status(500).send('Server Error remove Category!!!')
    }
}
