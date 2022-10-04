import { Address } from "./address";

export class Customer {
  _id: string;
  _name: string;
  _address!: Address;
  _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    // Autovalidação no momento de construção do objeto.
    // Self-validation at the time of object construction.
    this.validate();
  }

  /** Object attribute validation. */
  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required.");
    }
    if (this._id.length === 0) {
      throw new Error("ID is required.");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer.");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set address(address: Address) {
    this._address = address;
  }
}
