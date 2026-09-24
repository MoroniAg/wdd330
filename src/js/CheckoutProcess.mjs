import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor() {
    this.subtotal = 0;
    this.services = new ExternalServices();
    loadHeaderFooter();
  }

  init() {
    this.calculateSubtotal();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = document.querySelector("#checkout-form");
    if (form) {
      const zipInput = document.querySelector("#zip");
      if (zipInput) {
        zipInput.addEventListener("change", () => {
          this.calculateOrderTotal();
        });
      }

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await this.checkout(form);
      });
    }
  }

  async checkout(form) {
    if (!form.checkValidity()) {
      alert("Please fill out all required fields.");
      return;
    }

    const formData = new FormData(form);
    const tax = this.subtotal * 0.06;
    const shipping = this.calculateShipping();
    const total = this.subtotal + tax + shipping;

    const order = {
      orderDate: new Date().toISOString(),
      fname: formData.get("first-name"),
      lname: formData.get("last-name"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      cardNumber: formData.get("cc-number"),
      expiration: formData.get("cc-exp"),
      code: formData.get("cc-cvv"),
      items: this.packageItems(),
      orderTotal: total.toFixed(2),
      shipping: shipping,
      tax: tax.toFixed(2),
    };

    try {
      const response = await this.services.checkout(order);
      console.log("Order submitted:", response);
      localStorage.removeItem("so-cart");
      form.reset();
      alert("Order placed successfully!");
    } catch (error) {
      console.error(error);
      alert("There was an error placing your order.");
    }
  }

  packageItems() {
    const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

    return cart.map((item) => ({
      id: item.Id || item.id,
      name: item.Name || item.name,
      price: Number(item.FinalPrice || item.ListPrice || item.price || 0),
      quantity: Number(item.Quantity || item.quantity || 1),
    }));
  }

  calculateSubtotal() {
    const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    this.subtotal = cart.reduce((sum, item) => {
      const quantity = item.Quantity || item.quantity || 1;
      const price = Number(item.FinalPrice || item.ListPrice || item.price || 0);
      return sum + price * quantity;
    }, 0);

    const subtotalElement = document.querySelector("#subtotal");
    if (subtotalElement) {
      subtotalElement.textContent = `$${this.subtotal.toFixed(2)}`;
    }
    return this.subtotal;
  }

  calculateShipping() {
    const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + Number(item.Quantity || item.quantity || 1), 0);
    return totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;
  }

  calculateOrderTotal() {
    const tax = this.subtotal * 0.06;
    const shipping = this.calculateShipping();
    const total = this.subtotal + tax + shipping;

    const taxElement = document.querySelector("#tax");
    const shippingElement = document.querySelector("#shipping");
    const totalElement = document.querySelector("#total");

    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = `$${shipping.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
  }
}

const checkout = new CheckoutProcess();
checkout.init();
