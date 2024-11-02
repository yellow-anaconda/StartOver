const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },

  products: [
    {
      name: {
        type: String,
        require: true,
      },
      quantity: {
        type: String,
        require: true,
      },
      price: {
        type: String,
        require: true,
      },
      Image: {
        type: String,
        require: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    require: true,
  },
  shippingAddress: {
    name: {
      type: String,
      require: true,
    },
    mobileNo: {
      type: String,
      require: true,
    },
    houseNo: {
      type: String,
      require: true,
    },
    street: {
      type: String,
      require: true,
    },
    landmark: {
      type: String,
      require: true,
    },
    postalcode: {
      type: String,
      require: true,
    },
  },
  PaymentMethod: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order",orderSchema)

module.exports = Order;
