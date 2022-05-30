import { Sequelize } from "sequelize";
import { initModels, product, productCreationAttributes, order, orderCreationAttributes, orderdetail, orderdetailCreationAttributes } from "./models/init-models";
import * as dotenv from "dotenv";
import { ApolloServer, gql } from "apollo-server";
import { readFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";

const typeDefs = readFileSync("./src/order.graphql").toString("utf-8");

dotenv.config();
console.log(process.env);

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASS as string, {
  host: process.env.DB_HOST as string,
  dialect: "mysql",
});

initModels(sequelize);

const resolvers = {
  Query: {
    product: async () => product.findAll(),
    order: async () => await order.findAll(),
  },
  Mutation: {
    GetDetailProduct: async (_parent: any, args: any) => {
      return await product.findByPk(args.id);
    },
    createProduct: async (_parent: any, args: any) => {
      const newProduct: productCreationAttributes = {
        name: args.name,
        stock: args.stock,
        price: args.price,
        created: args.created,
      };
      return await product.create(newProduct);
    },
    deleteProduct: (_parent: any, args: any) => {
      return product.destroy({ where: { id: args.id } });
    },
    updateProduct: async (_parent: any, args: any) => {
      const updProduct: productCreationAttributes = {
        name: args.name,
        stock: args.stock,
        price: args.price,
        created: args.created,
      };
      return await product.update(updProduct, { where: { id: args.id } });
    },
    getDetailOrder: async (_parent: any, args: any) => {
      return await order.findByPk(args.id);
    },

    createOrder: async (_parent: any, args: any) => {
      const now = new Date();
      const generator = uuidv4();

      const newOrder: orderCreationAttributes = {
        transcode: generator,
        created: now.toDateString(),
      };
      return await order.create(newOrder);
    },

    updateOrder: async (_parent: any, args: any) => {
      const generator = uuidv4();

      const updOrder = {
        transcode: generator,
      };
      await order.update(updOrder, { where: { id: args.id } });
      return await order.findByPk(args.id);
    },

    deleteOrder: (_parent: any, args: any) => {
      order.destroy({ where: { id: args.id } });
      return order.findByPk(args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,

  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
