import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
const connectionUrl =
  "mongodb+srv://togrul:togrul@firstcluster.udpwqcz.mongodb.net/";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  image: {type: String, required:true},
  title: {type: String, required:true},
  desc:  {type: String, required:true},
  price:   {type: Number, required:true},
  category:  {type: String, required:true},
});

const Products = mongoose.model("Tasty", ProductSchema);

// Get All Products

app.get("/", async (req, res) => {
  try {
    const allProducts = await Products.find({});
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

// Get Product By ID

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Products.findById(id);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

// Create Product

app.post("/", async (req, res) => {
  try {
    const products = new Products(req.body)
    await products.save()
    res.status(200).send("Product Created!");
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

// Delete Product

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Products.findByIdAndDelete(id);
    res.status(200).send("Product Deleted!");
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose
  .connect(connectionUrl)
  .then(() => console.log("DB Connected!"))
  .catch(() => console.log("DB not Connected!"));
