const router = require("express").Router();
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAuth,
  verifyTokenAdmin,
} = require("./verifyToken");
//post a new product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(err);
  }
});

//get single product
router.get("/find/:id", async (req, res) => {
  try {
    const singleproduct = await Product.findById(req.params.id);
    res.status(200).json(singleproduct);
  } catch (error) {
    res.status(500).json("error");
  }
});
//get all products

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    if (qNew) {
      allproducts = await Product.find().sort({ _id: -1 }).limit(5);
    } else if (qCategory) {
      allproducts = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      allproducts = await Product.find();
    }

    res.status(200).json(allproducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete product

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product deleted");
  } catch (error) {
    res.status(500).json("error");
  }
});
module.exports = router;
