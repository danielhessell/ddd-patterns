import { Sequelize } from "sequelize-typescript";
import { Product } from "../../domain/entity/product";
import { ProductModel } from "../db/sequelize/model/product.model";
import { ProductRepository } from "./porduct.repository";

describe("Product repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("P001", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "P001" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "P001",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("P001", "Product 1", 100);

    await productRepository.create(product);

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel = await ProductModel.findOne({ where: { id: "P001" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "P001",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("P001", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    const foundProduct = await productRepository.findById(product.id);

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("P001", "Product 1", 100);
    await productRepository.create(product1);

    const product2 = new Product("P002", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product1, product2];

    expect(products).toEqual(foundProducts);
  });
});
