import { products } from "../../data/products.js";
import { cart,deleteElement,updateDeliveryOption} from "../../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../../data/deliveryOptions.js";
import {renderPaymentSummary} from "../checkout/payment.js"
export function renderOrderSummary(){
let html = ''; 
let checkproduct;
cart.forEach((item) => {
    let productId = item.productId;
    let deliveryId=item.deliveryOptionid;
    let option;
    deliveryOptions.forEach((date)=>{
      if(date.id===deliveryId){
        option=date;}}
  )
  const today=dayjs();
  const deliveryDate=today.add(option.deliverydays,'day');
  const dateString=deliveryDate.format('dddd, MMMM D');

    products.forEach((product) => {
        if (product.id === productId) {
            checkproduct = product;
        }
    });

    html += `
      <div class="cart-item-container js-cart-item-${checkproduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${checkproduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${checkproduct.name}
            </div>
            <div class="product-price">
              $${(checkproduct.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${checkproduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(checkproduct,item)}
          </div>
        </div>
    </div>

    `;
});
function deliveryOptionsHtml(checkproduct,item){
let html='';
  deliveryOptions.forEach((option)=>{
    const today=dayjs();
    const deliveryDate=today.add(option.deliverydays,'day');
    const dateString=deliveryDate.format('dddd, MMMM D');
    const priceString=option.priceCents===0?'FREE':`$${option.priceCents /100}-`
    const ischecked= option.id===item.deliveryOptionid;
    html+=`<div class="delivery-option 
    js-delivery-option" data-product-id="${checkproduct.id}" 
    data-delivery-option-id="${option.id}">
              <input type="radio" class="delivery-option-input" name="delivery-option-${checkproduct.id}" ${ischecked ? 'checked':''}>
              <div>
                <div class="delivery-option-date">
                 ${dateString}
                </div>
                <div class="delivery-option-price">
                  ${priceString} - Shipping
                </div>
              </div>
            </div>`

  })
return html;
}

document.querySelector(".js-order-summary").innerHTML = html;
document.querySelectorAll(".js-delete-link").forEach((deleteLink)=>{
    deleteLink.addEventListener('click',()=>{
        const productId=deleteLink.dataset.productId;
        deleteElement(productId);
      const containerdelete=document.querySelector(
        `.js-cart-item-${productId}`
      );
      containerdelete.remove();
      renderPaymentSummary();
      });


});
document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const productId = element.dataset.productId;
    const deliveryOptionId = element.dataset.deliveryOptionId;
    console.log(deliveryOptionId);
    console.log(productId);
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  })

})}
