/**
 * Init Payze Apple Pay SDK
 *
 * @param {string} trId  Transaction ID.
 * @param {string=} style  Form CSS Styles.
 * @param {string=} style.iframeWidth  IframeWidth size.
 * @param {string=} style.iframeHeight  IframeHeight size.
 *
 */
function InitPayzeApplePay(trId, { iframeWidth = '130', iframeHeight = '30' }) {
  if (!trId) {
    throw 'transactionId is required';
  }

  var BASE_URL = "https://paygate.payze.io";
  var iframeUrl = '';
  var createdElements = false;

  generateIframeUrl(trId);
  console.info('Payze Apple Pay SDK initialized');

  renderApplePay();

  /**
   *
   * Generate iframe urls
   *
   * @param {string} trId  Transaction ID.
   */
  function generateIframeUrl(trId) {
    iframeUrl = `${BASE_URL}/applePay?transactionId=${trId}`;
  }

  function renderApplePay() {
    try {
      if (createdElements) {
        return;
      }
      var element = document.getElementById('apple-pay');

      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', `${iframeUrl}`);
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

module.exports.Payze = InitPayzeApplePay;
