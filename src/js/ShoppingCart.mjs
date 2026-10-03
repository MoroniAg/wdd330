import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const image = item.Images?.PrimaryMedium || item.Images?.PrimaryLarge || item.Image || item.PrimaryLarge || "";
  const color = item.Colors?.[0]?.ColorName || item.Color || "";
  const price = Number(item.FinalPrice ?? item.Price ?? item.ListPrice ?? 0);
  const productUrl = `../product_pages/index.html?product=${encodeURIComponent(item.Id)}`;

  return `<li class="cart-card divider">
  <a href="${productUrl}" class="cart-card__image">
    <img
      src="${image}"
      alt="${item.Name}"
    />
  </a>
  <a href="${productUrl}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${color}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${price.toFixed(2)}</p>
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
