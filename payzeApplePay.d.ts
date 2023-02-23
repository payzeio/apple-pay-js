/**
 * Init Payze Apple Pay SDK
 *
 * @param {string=} merchantIdentifier  Merchant Identifier (merchant.io.payze...)
 * @param {string=} config // configure  
 * @param {string=} config.amount  // pay amount (0.1, 10, 2.5)
 * @param {string=} config.currencyCode  // default is GEL
 * @param {string=} config.label  // 'Payze' is default
 * @param {function=} callback  // callback to get the status of the payment
 *
 */

export function PayzeApplePay(merchantIdentifier: string, config: any, callback?: any): {
  makeApplePay: (trId: string, preAuth: boolean) => void;
};
