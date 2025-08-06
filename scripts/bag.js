let bagItemObject;
onLoad();
function onLoad () {
  displayBagItems();
  displayBagPrice();
}


function displayBagItems () {
  let bagItemElement = document.querySelector('.bag_items_container');

  // console.log(bagItemsCount);
  // console.log(productList.length)

  bagItemObject = bagItemsCount.map( (itemid => {
    for (let i = 0; i < productList.length; i++) {
      if(productList[i].id == itemid) {
        return productList[i];
      }
      
    }
  })); 

  let bagHtml = ''; 
bagItemObject.forEach(element => {
   bagHtml += `<div class="bag_item">
              <div class="product_img">
                <img src="${element.image}" alt="Add to cart">
              </div>
              <div class="product_detail">
                <p class="company_name">${element.company}</p>
                <p class="product_name">${element.item_name}</p>
                <div class="price_detail">
                  <span class="current_price">Rs.${element.current_price}</span>
                  <span class="original_price">Rs. ${element.original_price}</span>
                  <span class="discount_price">(${element.discount_percentage}% OFF )</span> 
                </div>
                <div class="remove_product">
                  <span class="material-symbols-outlined" onclick="removeProductFormBag(${element.id})">close</span>
                </div>
              </div> 
            </div>`
});
  bagItemElement.innerHTML = bagHtml;
}

function removeProductFormBag (itemId) {
  
  bagItemsCount = bagItemsCount.filter( (item) => item != itemId
);
  localStorage.setItem('bagItemsCount',JSON.stringify(bagItemsCount));
  displayBagItemsCount();
  displayBagItems();
  displayBagPrice();
  // console.log(bagItemsCount);
}

console.log(bagItemObject);

function displayBagPrice () {
  let BagPriceElement = document.querySelector('.price_list');

  let totalItems = bagItemObject.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let convenienceFee = 51; 

  bagItemObject.forEach( bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

   let finalPayment = totalMRP - totalDiscount + convenienceFee; 

  BagPriceElement.innerHTML = `<div class="price_container">
          <div class="box_price">
            <div class="price_header">price detaile ( ${totalItems} item )</div>
            <div class="price_item">
              <span>Total MRP</span>
              <span class="secont_span">Rs. ${totalMRP}</span>
            </div>
            <div class="price_item">
              <span>Discount on MRP</span>
              <span class="secont_span discountColor">-Rs. ${totalDiscount}</span>
            </div>
            <div class="price_item">
              <span>Convenience Fee</span>
              <span class="secont_span">Rs. ${convenienceFee}</span>
            </div>
          </div>
          <div class="total_amount">
            <span>Total Amount</span>
            <span class="secont_span">Rs. ${finalPayment}</span>
          </div>
          <button>place order</button>
        </div>`

}
