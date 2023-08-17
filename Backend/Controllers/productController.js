const productModel = require('../Models/productModel');
const chatModel = require('../Models/chatModel');

const createProduct = async (req, res) => {
  try {
    const userId = res.locals.user._id.toString();
    const { productName, productDescription, price, image } = req.body;

    const newProduct = new productModel({
      productName,
      productDescription,
      price,
      image,
      userId,
      isChatCreated: false,
      chatId: null,
    });

    const response = await newProduct.save();

    res.status(200).json({
      status: 200,
      productData: response,
      message: 'Success',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e,
    });
  }
};

const getALlProducts = async (req, res) => {
  try {
    const userId = res.locals.user._id.toString();

    const products = await productModel.find({ userId: { $nin: [userId] } });

    res.status(200).json({
      status: 200,
      products,
      message: 'Success',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e,
    });
  }
};

module.exports = { createProduct, getALlProducts };
