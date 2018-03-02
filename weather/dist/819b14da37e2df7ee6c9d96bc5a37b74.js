// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var api = "16b76a4bf5553901df564275e8be0a21";
var apiLink = "https://api.openweathermap.org/data/2.5";
//const city = 'Kiev';
//const scale = 'metric';
//const days = 7;
var get = function get(url) {
    return fetch("" + apiLink + url + "&APPID=" + api).then(function (response) {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
};
var getTodayForecast = function getTodayForecast(query) {
    return get("/weather" + query);
};
var getWeekForecast = function getWeekForecast(query) {
    return get("/forecast" + query);
};

var getForecast = exports.getForecast = function getForecast(city) {
    return Promise.all([getTodayForecast("?q=" + city), getWeekForecast("?q=" + city)]);
};
},{}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocationSearch = function () {
    function LocationSearch() {
        _classCallCheck(this, LocationSearch);

        this.state = {
            isValid: true
        };

        bindAll(this, 'handleSubmit');
        this.host = document.createElement('div');
        this.host.classList.add('location-search-container');
        this.host.addEventListener('submit', this.handleSubmit);
    }

    _createClass(LocationSearch, [{
        key: 'updateState',
        value: function updateState(nextState) {
            this.state = nextState;
            this.render();
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(ev) {
            ev.preventDefault();

            var city = ev.target.elements.search.value.trim();
            if (!city.length) {
                this.updateState({ isValid: false });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var isValid = this.state.isValid;


            this.host.innerHTML = '\n            <form class=\'weather-form\'>\n                <input name=\'search\' required class = \'search-weather\'>\n                <button class=\'weather-search-submit\'>find</button>\n            </form>';
            return this.host;
        }
    }]);

    return LocationSearch;
}();

exports.default = LocationSearch;
},{}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var host = document.getElementById('today-forecast-container');

var render = function render(city) {
    host.innerHTML = '\n    <h3>Weather today</h3>\n    <h2>' + city.name + '</h2>\n    <p>Temp: ' + city.main.temp + ' K</p>\n    <p>Humidity: ' + city.main.humidity + '</p>\n    <p>Pressure: ' + city.main.pressure + '</p>\n  ';
};

exports.default = render;
},{}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var host = document.getElementById('week-forecast-container');

var render = function render(cities) {
    var items = cities.map(function (city) {
        return '\n        <li>\n          <h3>' + new Date(city.dt) + '</h3>\n          <p>Temp: ' + city.main.temp + ' K</p>\n          <p>Humidity: ' + city.main.humidity + '</p>\n          <p>Pressure: ' + city.main.pressure + '</p>\n        </li>\n    ';
    }).join('');

    host.innerHTML = '\n    <div class=\'week-forecast\'>\n      <h3>Week forecast</h3>\n      <ul>' + items + '</ul>\n    </div>';
};

exports.default = render;
},{}],3:[function(require,module,exports) {
'use strict';

var _api = require('./utils/api');

var _LocationSearch = require('./components/LocationSearch');

var _LocationSearch2 = _interopRequireDefault(_LocationSearch);

var _Today = require('./components/Today');

var _Today2 = _interopRequireDefault(_Today);

var _Week = require('./components/Week');

var _Week2 = _interopRequireDefault(_Week);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(3);
//import { getMidnightWeather } from './utils/mid';
},{"./utils/api":4,"./components/LocationSearch":6,"./components/Today":7,"./components/Week":8}],2:[function(require,module,exports) {
'use strict';

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(2);
},{"./App":3}],9:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '49221' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[9,2])
//# sourceMappingURL=/dist/819b14da37e2df7ee6c9d96bc5a37b74.map