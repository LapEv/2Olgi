function Device(){
  let device,
  unit,
  documentElement,
  find,
  userAgent;
  device = {};
  window.device = device;
  documentElement = window.document.documentElement;
  userAgent = window.navigator.userAgent.toLowerCase();
  device.ios = function () {
      return device.iphone() || device.ipod() || device.ipad();
    };
  
    device.iphone = function () {
      return !device.windows() && find('iphone');
    };
  
    device.ipod = function () {
      return find('ipod');
    };
  
    device.ipad = function () {
      return find('ipad');
    };
  
    device.android = function () {
      return !device.windows() && find('android');
    };
  
    device.androidPhone = function () {
      return device.android() && find('mobile');
    };
  
    device.androidTablet = function () {
      return device.android() && !find('mobile');
    };
  
    device.blackberry = function () {
      return find('blackberry') || find('bb10') || find('rim');
    };
  
    device.blackberryPhone = function () {
      return device.blackberry() && !find('tablet');
    };
  
    device.blackberryTablet = function () {
      return device.blackberry() && find('tablet');
    };
  
    device.windows = function () {
      return find('windows');
    };
  
    device.windowsPhone = function () {
      return device.windows() && find('phone');
    };
  
    device.windowsTablet = function () {
      return device.windows() && (find('touch') && !device.windowsPhone());
    };
  
    device.fxos = function () {
      return (find('(mobile;') || find('(tablet;')) && find('; rv:');
    };
  
    device.fxosPhone = function () {
      return device.fxos() && find('mobile');
    };
  
    device.fxosTablet = function () {
      return device.fxos() && find('tablet');
    };
  
    device.meego = function () {
      return find('meego');
    };
  
    device.cordova = function () {
      return window.cordova && location.protocol === 'file:';
    };
  
    device.nodeWebkit = function () {
      return typeof window.process === 'object';
    };
  
    device.mobile = function () {
      return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
    };
  
    device.tablet = function () {
      return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
    };
  
    device.desktop = function () {
      return !device.tablet() && !device.mobile();
    };
  
    device.television = function() {
      var i, tvString;
  
      television = [
        "googletv",
        "viera",
        "smarttv",
        "internet.tv",
        "netcast",
        "nettv",
        "appletv",
        "boxee",
        "kylo",
        "roku",
        "dlnadoc",
        "roku",
        "pov_tv",
        "hbbtv",
        "ce-html"
      ];
  
      i = 0;
      while (i < television.length) {
        if (find(television[i])) {
          return true;
        }
        i++;
      }
      return false;
    };
  
    find = function (needle) {
      return userAgent.indexOf(needle) !== -1;
    };
  
    if (device.ios()) {
      if (device.ipad()) {
          unit= "ios ipad tablet";
      } else if (device.iphone()) {
          unit = "ios iphone mobile";
      } else if (device.ipod()) {
          unit = "ios ipod mobile";
      }
    } else if (device.android()) {
      if (device.androidTablet()) {
          unit = "android tablet";
      } else {
          unit = "android mobile";
      }
    } else if (device.blackberry()) {
      if (device.blackberryTablet()) {
          unit = "blackberry tablet";
      } else {
          unit = "blackberry mobile";
      }
    } else if (device.windows()) {
      if (device.windowsTablet()) {
          unit = "windows tablet";
      } else if (device.windowsPhone()) {
          unit = "windows mobile";
      } else {
          unit = "desktop";
      }
    } else if (device.fxos()) {
      if (device.fxosTablet()) {
          unit = "fxos tablet";
      } else {
          unit = "fxos mobile";
      }
    } else if (device.meego()) {
      unit = "meego mobile";
    } else if (device.nodeWebkit()) {
      unit = "node-webkit";
    } else if (device.television()) {
      unit = "television";
    } else if (device.desktop()) {
      unit = "desktop";
    }
  
    if (device.cordova()) {
      unit = "cordova";
    }
  return(unit);
};