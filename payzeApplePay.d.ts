/**
 * Init Payze Apple Pay SDK
 *
 * @param {string=} merchantIdentifier  Merchant Identifier (merchant.io.payze...)
 * @param {string=} config // configure  
 * @param {string=} config.amount  // pay amount (0.1, 10, 2.5)
 * @param {string=} config.currencyCode  // default is GEL
 * @param {string=} config.countryCode  // default is GE
 * @param {string=} config.label  // 'Payze' is default
 *
 */

export function PayzeApplePay(merchantIdentifier, config: any): {
  makeApplePay: (trId: string) => void;
};
