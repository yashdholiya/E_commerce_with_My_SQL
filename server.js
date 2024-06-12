const express = require("express");
const server = express();
const mysql = require("mysql2/promise");
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./route/User/user.route");
const AdminRouter = require("./route/Admin/admin.route");
const productRoute = require("./route/Admin/product.route");
const favoriteRoute = require("./route/User/favorite.route");
const productuRoute = require("./route/User/product.route");
const cartRoute = require("./route/User/cart.route");
const orderItemRoute = require("./route/User/order_item.route");
const orderRouter = require("./route/User/order.route");
const categoryRoutr = require("./route/Admin/categories.route");
const addressRoute = require("./route/User/u_address.route");
const paymentRouter = require("./route/User/payment.route");
const refundRoute = require("./route/User/refund.route");
const orderaRoute = require("./route/Admin/order.route");
const cupanRoute = require("./route/Admin/cupan.route");
const productStokRoute = require("./route/Admin/product_stoke.route");
const emailCodeRoute = require("./route/User/email_code.route");
const shipmentRoute = require("./route/User/shipments.route");
const deleverRoute = require("./route/Admin/delever.route");
const reviewRoute = require("./route/User/review.route");
const imagePath = path.join(__dirname, "public", "images");

const PORT = process.env.PORT || 2323;
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/public/images", express.static(imagePath));

// Database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "project_sql",
});

global.db = db;

server.use("/api/user", userRoutes);
server.use("/api/admin", AdminRouter);
server.use("/api/product", productRoute);
server.use("/api/favorite", favoriteRoute);
server.use("/api/product", productuRoute);
server.use("/api/cart", cartRoute);
server.use("/api/orderitem", orderItemRoute);
server.use("/api/order", orderRouter);
server.use("/api/Categoriy", categoryRoutr);
server.use("/api/address", addressRoute);
server.use("/api/payment", paymentRouter);
server.use("/api/delevery", shipmentRoute);
server.use("/api/refund", refundRoute);
server.use("/api/order/admin", orderaRoute);
server.use("/api/cupan", cupanRoute);
server.use("/api/product/stoke", productStokRoute);
server.use("/api/email/code", emailCodeRoute);
server.use("/api/order/delever", deleverRoute);
server.use("/api/reviwe", reviewRoute);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
