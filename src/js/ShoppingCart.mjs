import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
    constructor(dataSource, listElement, footerElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.footerElement = footerElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
        this.renderFooter(list);
    }

    renderList(list) {
        if (!list || list.length === 0) {
            this.listElement.innerHTML = "";
            this.footerElement.classList.add("hide");
            return;
        }
        renderListWithTemplate(cartItemTemplate, this.listElement, list, "beforeend", true);
    }

    renderFooter(list) {
        if (!list || list.length === 0) {
            this.footerElement.classList.add("hide");
            this.footerElement.innerHTML = "";
            return;
        }

        const total = list.reduce((sum, item) => sum + Number(item.FinalPrice || 0), 0);
        this.footerElement.classList.remove("hide");
        this.footerElement.innerHTML = `<p class="cart-total">Total: $${total.toFixed(2)}</p>`;
    }
}
