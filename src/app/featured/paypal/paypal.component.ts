import { Component, OnInit } from '@angular/core';
import { PaypalCheckout, PaypalOptions } from 'nativescript-paypal-checkout';
@Component({
  selector: 'ns-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
  moduleId: module.id,
})
export class PaypalComponent implements OnInit {

  private paypalCheckout: PaypalCheckout;
 
  constructor() { }

  ngOnInit() {

    
  this.paypalCheckout = new PaypalCheckout();
   
  let options: PaypalOptions = {
      token: "sabirhumera95-facilitator@gmail.com", // The token is obtained from the server
      amount: "10",
      currencyCode: "USD"
  };
   
  this.paypalCheckout.paypalRequest(options).then(
      (nonce) => {
          console.log("Token nonce: " + nonce);
      }, (error) => {
          console.log(error);
      }
  );
  }

}
