import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';

export interface orderdetailAttributes {
  id: number;
  productid: number;
  quantity: number;
  price: number;
  order_id: number;
}

export type orderdetailPk = "id";
export type orderdetailId = orderdetail[orderdetailPk];
export type orderdetailOptionalAttributes = "id";
export type orderdetailCreationAttributes = Optional<orderdetailAttributes, orderdetailOptionalAttributes>;

export class orderdetail extends Model<orderdetailAttributes, orderdetailCreationAttributes> implements orderdetailAttributes {
  id!: number;
  productid!: number;
  quantity!: number;
  price!: number;
  order_id!: number;

  // orderdetail belongsTo order via order_id
  order!: order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof orderdetail {
    return orderdetail.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'orderdetail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "order_id",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
  }
}
