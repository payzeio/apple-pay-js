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
function PayzeApplePay(merchantIdentifier, { amount, currencyCode, label }, callback = null) {
  if (!merchantIdentifier) {
    throw "merchant Identifier is required";
  }

  if (!amount) {
    throw "amount is required";
  }

  if (!currencyCode) {
    currencyCode = "GEL";
  }

  var countryCode = "GE";


  if (!label) {
    label = "Payze";
  }

  var canUseApplePay = false;

  var BASE_URL = "https://payze.io/v2/api/applepay";

  var headers = {
    "Accept": "text/plain",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-type": "application/json"
  };

  init();
  console.info('Payze Apple Pay SDK initialized');

  function validateMerchant(trId) {
    return fetch(`${BASE_URL}/start-payment`, {
      method: "POST",
      body: JSON.stringify({
        transactionId: trId
      }),
      headers: headers
    });
  }

  function init() {
    if (window.ApplePaySession) {
      var promise = window.ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
      promise.then(function (canMakePaymentsWallet) {
        canUseApplePay = canMakePaymentsWallet;
        if (!canMakePaymentsWallet) {
          var button = document.getElementById('apple-pay-button');
          button.removeEventListener('click', makeApplePay, false);
          button.remove();
        }
      });
    }
  }

  /**
  * Make Payze Apple Pay With TransactionId
  *
  * @param {string} trId  Transaction ID or promise that returns it.
  * 
  */
  function makeApplePay(trId) {
    if (!canUseApplePay) {
      throw "can't use apple pay";
    }

    if (!trId) {
      throw "transactionId is required";
    }

    var applePayToken = null;
    var promisedTrId = null;

    var request = {
      countryCode: countryCode,
      currencyCode: currencyCode,
      supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
      merchantCapabilities: ['supports3DS'],
      total: { label: label, amount: amount }
    }

    const session = new (window).ApplePaySession(10, request);

    session.onvalidatemerchant = async (event) => {
      const merchantSession = validateMerchant(promisedTrId ?? trId);
      merchantSession.then((response) => {
        response.json().then((data) => {
          applePayToken = data.data.token;
          session.completeMerchantValidation(data.data);
        }).catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        console.log(err);
      });
    };

    session.onpaymentmethodselected = (event) => {

      const update = {
        newTotal: { label: label, amount: amount },
      };

      session.completePaymentMethodSelection(update);
    };

    session.onshippingmethodselected = (event) => {

      const update = {};

      session.completeShippingMethodSelection(update);

    };

    session.onpaymentauthorized = (event) => {
      var token = event.payment.token;

      var acceptApplePay = fetch(`${BASE_URL}/accept`, {
        method: "POST",
        body: JSON.stringify({
          token: applePayToken,
          payzeTransactionId: promisedTrId ?? trId,
          acceptRequest: {
            version: token.paymentData.version,
            data: token.paymentData.data,
            signature: token.paymentData.signature,
            ephemeralPublicKey: token.paymentData.header.ephemeralPublicKey,
            publicKeyHash: token.paymentData.header.publicKeyHash,
            transactionId: token.paymentData.header.transactionId,
            displayName: token.paymentMethod.displayName,
            network: token.paymentMethod.network,
            type: token.paymentMethod.type,
            transactionIdentifier: token.transactionIdentifier
          }
        }),
        headers: headers
      });

      var status = (window).ApplePaySession.STATUS_FAILURE;

      acceptApplePay.then((response) => {
        response.json().then((data) => {
          if (data.status.code == "Success") {
            status = (window).ApplePaySession.STATUS_SUCCESS;
          }

          const result = {
            "status": status
          };

          session.completePayment(result);

          if (callback) {
            callback(result);
          }
        })
      });
    };

    session.oncancel = (event) => {
      if (callback) {
        const result = {
          "status": (window).ApplePaySession.STATUS_FAILURE
        };
        callback(result);
      }
    }

    if (typeof trId === 'string') {
      session.begin()
    } else {
      return trId.then((id) => {
        promisedTrId = id
        session.begin()
      })
      .catch((error) => {
        session.abort()
        throw error
      })
    }
  }

  return {
    makeApplePay
  };
}

module.exports.PayzeApplePay = PayzeApplePay;
