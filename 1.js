function totalHarga(){
    // initiating all variable
    let showPrice = document.getElementById('price');
    let showDiscount = document.getElementById('discount');
    let showTotalPrice = document.getElementById('total-price')
    let quality = document.getElementById('quality').value;
    let price;
    let discount;
    let totalPrice;
    let quantity = document.getElementById('quantity').value;
    // A Quality
    if (quantity <1) {
        alert ('Input Jumlah Barang Salah')
    }
    else {
    if (quality == 'A') {
        price = 4550;
       if (quantity >13) {
           discount = 231 * quantity;
       }
       else {
        discount = 0;
       }
    }
    // B Quality
    if (quality == 'B') {
        price = 5330;
       if (quantity >7) {
           discount = price * 23/100 * quantity;
       }
       else {
        discount = 0;
       }
    }
    // C Quality
    else if (quality == 'C'){
        price = 8653;
        discount = 0;
    }
}
// Get total price and print it to screen
totalPrice =  price*quantity-discount;
showPrice.setAttribute('value',price);
showDiscount.setAttribute('value',discount);
showTotalPrice.setAttribute('value',totalPrice);
}