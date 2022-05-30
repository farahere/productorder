import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface productAttributes {
  id: number;
  name: string;
  stock: number;
  price: number;
  created: string;
}

export type productPk = "id";
export type productId = product[productPk];
export type productOptionalAttributes = "id";
export type productCreationAttributes = Optional<productAttributes, productOptionalAttributes>;

export class product extends Model<productAttributes, productCreationAttributes> implements productAttributes {
  id!: number;
  name!: string;
  stock!: number;
  price!: number;
  created!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof product {
    return product.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        created: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "product",
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
