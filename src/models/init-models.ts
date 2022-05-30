import type { Sequelize } from "sequelize";
import { order as _order } from "./order";
import type { orderAttributes, orderCreationAttributes } from "./order";
import { orderdetail as _orderdetail } from "./orderdetail";
import type { orderdetailAttributes, orderdetailCreationAttributes } from "./orderdetail";
import { product as _product } from "./product";
import type { productAttributes, productCreationAttributes } from "./product";

export {
  _order as order,
  _orderdetail as orderdetail,
  _product as product,
};

export type {
  orderAttributes,
  orderCreationAttributes,
  orderdetailAttributes,
  orderdetailCreationAttributes,
  productAttributes,
  productCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const order = _order.initModel(sequelize);
  const orderdetail = _orderdetail.initModel(sequelize);
  const product = _product.initModel(sequelize);

  orderdetail.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(orderdetail, { as: "orderdetails", foreignKey: "order_id"});

  return {
    order: order,
    orderdetail: orderdetail,
    product: product,
  };
}
