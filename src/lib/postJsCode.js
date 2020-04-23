/* eslint-disable */
/** *
 * postJsCode.js
 * 预注入webview javascript code
 * web端使用：
 * window.APP.invokeClientMethod('getList', { page: 1 , size: 10}, callback);
 * * */
export default function clientMethod() {
  var APP = {
    __GLOBAL_FUNC_INDEX__: 0,
    invokeClientMethod(type, params, callback) {
    let name = ''
      if (typeof callback === 'function') {
        name= `__CALLBACK__${APP.__GLOBAL_FUNC_INDEX__++}`;
        APP[name] = callback;
      };
      window.ReactNativeWebView.postMessage(JSON.stringify({ type, params, callback: name }));
    },
    invokeWebMethod(callback, args) {
      var func = null;
      if (typeof callback === 'string' && callback.indexOf('__CALLBACK__') >= 0) {
        func = APP[callback];
        if (typeof func === 'function') {
          setTimeout(function () {
            func.call(this, args);
          }, 0);
        }
      } else {
        func = new Function('data',callback);
        setTimeout(function () {
          func.call(this, args);
        }, 0);
      }
    },
  };
  window.APP = APP;
  window.webviewCallback = function (data) {
    window.APP.invokeWebMethod(data.callback, data.args);
  };
}
