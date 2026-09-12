import{g as n}from"./utils-GfMpQpsc.js";function l(){const t=n("so-cart")??[],a=document.querySelector(".product-list"),r=document.querySelector(".cart-footer");if(!t.length){a.innerHTML="",r.classList.add("hide"),r.innerHTML="";return}const e=t.map(c=>i(c));a.innerHTML=e.join("");const o=t.reduce((c,s)=>c+Number(s.FinalPrice||0),0);r.classList.remove("hide"),r.innerHTML=`<p class="cart-total">Total: $${o.toFixed(2)}</p>`}function i(t){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}l();
