export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[
    {
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2,
        deliveryOptionid:'1'
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionid:'1'

    }
]}
function savetostorage(){
    localStorage.setItem('cart',JSON.stringify(cart));

}
export function addToCart(productId){ 
    let matchingItem = null; 
          cart.forEach((item) => {
              if (productId === item.productId) {
                  matchingItem = item; 
              }
          });
  
          if (matchingItem) {   
              matchingItem.quantity += 1;
          } else {
             
              cart.push({
                  productId: productId,
                  quantity: 1,
                  deliveryOptionid:'1'
              });
          }
         
          console.log(cart);
          let cartQuantity=0;
          cart.forEach((item)=>{
            cartQuantity+=item.quantity;
          });
          document.querySelector(".js-cart-quantity").innerHTML=cartQuantity;
          savetostorage();
      };
export function deleteElement(productId){
    let cartTemp=[];
    cart.forEach((tempItem)=>{
        if(tempItem.productId!==productId){
            cartTemp.push(tempItem);
        }
    })
    cart=cartTemp;
    savetostorage();
    
}
export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = null;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item; 
        }
    });
    console.log(matchingItem);
    if (matchingItem) {
        matchingItem.deliveryOptionid = deliveryOptionId;
        savetostorage();
        console.log('saved sucessfully');
    }
};