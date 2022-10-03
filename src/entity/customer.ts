class Customer {
  _id: string;
  _name: string;
  _address: string;
  _active: boolean = false;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;

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
    if (this._address.length === 0) {
      throw new Error("Address is mandatory to activate a customer.");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
