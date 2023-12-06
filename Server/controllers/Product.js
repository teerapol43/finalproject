const Product = require("../model/Product");
const fs = require('fs')
exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id }).exec();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.list = async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    var data = req.body
    if (req.file) {
      data.file = req.file.filename
    }
    console.log(data)
    const product = await Product(data).save();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec()
    res.send(updated);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const removed = await Product.findOneAndDelete({ _id: id }).exec();
    if (removed?.file) {
      await fs.unlink('./uploads' + removed.file, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Remove Success')
        }
      })
    }
    res.send(removed);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
