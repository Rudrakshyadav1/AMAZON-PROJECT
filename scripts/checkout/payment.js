import { cart } from "../../data/cart.js";
import {products} from "../../data/products.js"
import { deliveryOptions } from "../../data/deliveryOptions.js";
export function renderPaymentSummary(){
    let html;
    let price=0;
    let Shipping=0;
    let tax=0;
    let total=0;
    cart.forEach((item)=>{
        products.forEach((product)=>{
            if(product.id===item.productId){
                price+=item.quantity*product.priceCents;
            }
        })
        deliveryOptions.forEach((option)=>{
          if(option.id===item.deliveryOptionid){
              Shipping+=option.priceCents;
          }

      })

    })
    let cartQuantity=0;
    cart.forEach((item)=>{
      cartQuantity+=item.quantity;
    })
    total=price+Shipping;
    Shipping=(Shipping/100).toFixed(2);
    tax= (total/1000).toFixed(2);
    let totalaftertax= ((total +total*0.1)/100).toFixed(2);
    total=(total/100).toFixed(2);
    price=(price/100).toFixed(2);
    html+=`
    <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${price}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${Shipping}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${total}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${tax}
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalaftertax}</div>
          </div>
          <br>
          <button class="place-order-button button-primary">
            Place your order
          </button>
  
    `
    document.querySelector('.js-payment').innerHTML=html;
}