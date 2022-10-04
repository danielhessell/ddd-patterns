import { Address } from "./entity/address";
import { Customer } from "./entity/customer";
import { Order } from "./entity/order";
import { OrderItem } from "./entity/order-item";

// Agregrado 1 com uma relação de ID
let customer = new Customer("001", "Daniel Hessel");
const address = new Address("Rua 1", 15, "12345-678", "São Paulo");
customer.address = address;
customer.activate;

// Agregado 2 com uma relação de Objeto - Entidade, pois estão dentro do mesmo agregado
const item1 = new OrderItem("001", "Item 1", 10);
const item2 = new OrderItem("002", "Item 2", 15);
const order = new Order("001", "001", [item1, item2]);
