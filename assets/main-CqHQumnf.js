import{r as i}from"./utils-GfMpQpsc.js";import{P as c}from"./ProductData-Dx0C3TkS.js";function n(t){return`<li class="product-card">
    <a href="product_pages/?product=${t.Id}">
      <img src="${t.Image}" alt="${t.Name}">
      <h2 class="card__brand">${t.Brand.Name}</h2>
      <h3 class="card__name">${t.Name}</h3>
      <p class="product-card__price">$${t.FinalPrice}</p>
    </a>
  </li>`}class o{constructor(e,r,s){this.category=e,this.dataSource=r,this.listElement=s}async init(){const e=await this.dataSource.getData();this.renderList(e)}renderList(e){i(n,this.listElement,e,"beforeend",!0)}}const d=new c("tents"),a=document.querySelector(".product-list");a&&new o("tents",d,a).init();
