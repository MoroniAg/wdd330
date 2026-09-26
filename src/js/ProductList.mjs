import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    let discountFlag = "";
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        const savings = product.SuggestedRetailPrice - product.FinalPrice;
        const percentOff = Math.round((savings / product.SuggestedRetailPrice) * 100);

        // Display percentage if it's significant, otherwise display dollar amount
        const label = percentOff >= 10
            ? `${percentOff}% Off`
            : `$${savings.toFixed(2)} Off`;

        discountFlag = `<p class="discount-flag">${label}</p>`;
    }
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
      ${discountFlag}
    </a>
  </li>`;
}
export default class ProductList {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }


    async init() {
        this.products = await this.dataSource.getData(this.category);
        this.setupSortListener();
        this.renderList(this.products);
        this.updateTitle();
    }


    setupSortListener() {
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortProducts(e.target.value);
            });
        }
    }

    sortProducts(sortBy) {
        const sortedList = [...this.products];
        if (sortBy === 'name') {
            sortedList.sort((a, b) => a.Name.localeCompare(b.Name));
        } else if (sortBy === 'price') {
            sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
        }
        this.renderList(sortedList);
    }


    updateTitle() {
        const titleElement = document.querySelector('.products h2');
        if (titleElement) {
            // Capitalize first letter of the category
            const categoryName = this.category.charAt(0).toUpperCase() + this.category.slice(1);
            titleElement.textContent = `Top Products: ${categoryName}`;
        }
    }


    renderList(list) {
        this.listElement.innerHTML = "";
        renderListWithTemplate(productCardTemplate, this.listElement, list, "beforeend", false);
    }

}