import { Container } from "inversify";
import { makeLoggerMiddleware } from "inversify-logger-middleware";
import { IUserRepository, ICategoryRepository, IProductRepository, IOrderDetailsRepository, IOrderRepository } from "./IRepositories";
import { UserRepository, CategoryRepository } from "./repositories";
import { TYPES } from "./common";
import { ProductRepository } from "./repositories/product.repository";
import { OrderRepository } from "./repositories/order.repository";
import { OrderDetailsRepository } from "./repositories/order-details.repository";

export const createContainer = async (): Promise<Container> => {
  // load everything needed to the Container
  const container = new Container({ defaultScope: "Singleton" });

  if (process.env.NODE_ENV === "development") {
    const logger = makeLoggerMiddleware();
    container.applyMiddleware(logger);
  }
  // bind repository
  container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
  container.bind<ICategoryRepository>(TYPES.ICategoryRepository).to(CategoryRepository);
  container.bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository);
  container.bind<IOrderDetailsRepository>(TYPES.IOrderDetailsRepository).to(OrderDetailsRepository);
  container.bind<IOrderRepository>(TYPES.IOrderRepository).to(OrderRepository);

  return container;
};
