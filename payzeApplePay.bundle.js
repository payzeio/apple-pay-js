"use strict";

/**
 * Init Payze Apple Pay SDK
 *
 * @param {string} trId  Transaction ID.
 * @param {string=} style  Form CSS Styles.
 * @param {string=} style.iframeWidth  IframeHeight size.
 * @param {string=} style.iframeHeight  IframeHeight size.
 *
 */
function PayzeApplePay(trId, _ref) {
  var _ref$iframeWidth = _ref.iframeWidth,
      iframeWidth = _ref$iframeWidth === void 0 ? '130' : _ref$iframeWidth,
      _ref$iframeHeight = _ref.iframeHeight,
      iframeHeight = _ref$iframeHeight === void 0 ? '30' : _ref$iframeHeight;

  if (!trId) {
    throw 'transactionId is required';
  }

  var BASE_URL = "https://paygate.payze.io";
  var iframeUrl = '';
  var createdElements = false;
  generateIframeUrls(trId);
  console.info('Payze Apple Pay SDK initialized');
  renderApplePay();
  /**
   *
   * Generate iframe urls
   *
   * @param {string} trId  Transaction ID.
   */

  function generateIframeUrls(trId) {
    iframeUrl = "".concat(BASE_URL, "/applePay?transactionId=").concat(trId);
  }

  function renderApplePay() {
    try {
      if (createdElements) {
        return;
      }

      var element = document.getElementById('apple-pay');
      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', "".concat(iframeUrl));
      iframe.setAttribute('name', 'applepay');
      iframe.setAttribute('id', 'payze-apple-pay-iframe');
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('height', iframeHeight + 'px');
      iframe.setAttribute('width', iframeWidth + 'px');
      element.append(iframe);
      createdElements = true;
    } catch (e) {
      console.error(e);
    }

    return {};
  }
}

module.exports.PayzeApplePay = PayzeApplePay;
