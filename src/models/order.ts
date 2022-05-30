import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { orderdetail, orderdetailId } from "./orderdetail";

export interface orderAttributes {
  id: number;
  transcode: string;
  created: string;
}

export type orderPk = "id";
export type orderId = order[orderPk];
export type orderOptionalAttributes = "id";
export type orderCreationAttributes = Optional<orderAttributes, orderOptionalAttributes>;

export class order extends Model<orderAttributes, orderCreationAttributes> implements orderAttributes {
  id!: number;
  transcode!: string;
  created!: string;

  // order hasMany orderdetail via order_id
  orderdetails!: orderdetail[];
  getOrderdetails!: Sequelize.HasManyGetAssociationsMixin<orderdetail>;
  setOrderdetails!: Sequelize.HasManySetAssociationsMixin<orderdetail, orderdetailId>;
  addOrderdetail!: Sequelize.HasManyAddAssociationMixin<orderdetail, orderdetailId>;
  addOrderdetails!: Sequelize.HasManyAddAssociationsMixin<orderdetail, orderdetailId>;
  createOrderdetail!: Sequelize.HasManyCreateAssociationMixin<orderdetail>;
  removeOrderdetail!: Sequelize.HasManyRemoveAssociationMixin<orderdetail, orderdetailId>;
  removeOrderdetails!: Sequelize.HasManyRemoveAssociationsMixin<orderdetail, orderdetailId>;
  hasOrderdetail!: Sequelize.HasManyHasAssociationMixin<orderdetail, orderdetailId>;
  hasOrderdetails!: Sequelize.HasManyHasAssociationsMixin<orderdetail, orderdetailId>;
  countOrderdetails!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof order {
    return order.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        transcode: {
          type: DataTypes.STRING(80),
          allowNull: false,
        },
        created: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "order",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}

