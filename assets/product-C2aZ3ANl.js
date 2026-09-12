import{g as r,s as o,a as s}from"./utils-GfMpQpsc.js";import{P as i}from"./ProductData-Dx0C3TkS.js";class e{constructor(t,c){this.productId=t,this.product={},this.dataSource=c}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addProductToCart.bind(this))}renderProductDetails(){const t=document.querySelector(".product-detail");t&&(t.innerHTML=`
      <h3>${this.product.Brand}</h3>
      <h2 class="divider">${this.product.Name}</h2>
      <img class="divider" src="${this.product.Image}" alt="${this.product.Name}" />
      <p class="product-card__price">$${this.product.Price}</p>
      <p class="product__color">${this.product.Color}</p>
      <p class="product__description">${this.product.Description}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `)}addProductToCart(){const t=r("so-cart")||[];t.push(this.product),o("so-cart",t),alert(`${this.product.Name} has been added to your cart!`)}}const u=s(),a=new i("tents"),n=new e(u,a);n.init();function p(d){const t=r("so-cart")||[];t.push(d),o("so-cart",t)}async function h(d){const t=await a.findProductById(d.target.dataset.id);p(t)}document.getElementById("addToCart").addEventListener("click",h);
