import { Sequelize } from "sequelize";
import { initModels, product, productCreationAttributes, order, orderCreationAttributes } from "./models/init-models";
import * as dotenv from "dotenv";
import { ApolloServer, gql } from "apollo-server";
import { readFileSync } from "fs";

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
    GetDetailOrder: async (_parent: any, args: any) => {
      return await order.findByPk(args.id);
    },
    createOrder: async (_parent: any, args: any) => {
      const newOrder: orderCreationAttributes = {
        transcode: args.transcode,
        created: args.created,
      };
      return await order.create(newOrder);
    },
    deleteOrder: (_parent: any, args: any) => {
      return order.destroy({ where: { id: args.id } });
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
