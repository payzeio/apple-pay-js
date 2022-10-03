<div id="top"></div>

[comment]: <> ([![Stargazers][stars-shield]][stars-url])
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://payze.io" target="_blank">
    <img src="https://payze.io/assets/images/logo_v2.svg" alt="Logo" height="40">
  </a>

<h3 align="center">Payze Apple Pay JS SDK</h3>

[comment]: <> (  <p align="center">)

[comment]: <> (    <a href="">View Demo</a>)

[comment]: <> (    ·)

[comment]: <> (    <a href="">Report Bug</a>)

[comment]: <> (  </p>)
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

Payze is the best software platform for running an internet business. We handle money movement flow for our customers by
giving them tools they need.

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Install payze package in your project
   ```sh
   npm install @payze/payze-apple-pay
   ```

### Basic Usage

1. Import payze-apple-pay SDK
   ```ts
   import { PayzeApplePay } from "@payze/payze-apple-pay";
   ```
2. Initialize payze
   ```ts
   const applePay = PayzeApplePay({});
   ```
3. Include following html
   ```html
    <div class="apple-pay-button apple-pay-button-black" 
          id="apple-pay-button" 
          (click)="clickEvent()">

    </div>
   ```
4. Initialize Payment (In order to get transactionId you need to make request from API (<a href="https://docs.payze.io/reference/just-pay">'Just Pay'</a> or <a href="https://docs.payze.io/reference/single-payment-and-split">'Single Payment and Split'</a>)
   ```ts
   clickEvent() {
    this.applePay.makeApplePay('transactionId');
   }
   ```

### Customization

```js
// Payze Apple Pay SDK accepts 2 arguments: merchant Identifier and configuration
// both are required
// Example usage: 
const payze = PayzeApplePay('merchant.io.payze', {
  amount: 10, // required
  currencyCode: 'GEL', // default (not required)
  label: 'Payze' // default (not required)
});
 ```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge

[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge

[license-url]: https://github.com/LICENSE.txt
