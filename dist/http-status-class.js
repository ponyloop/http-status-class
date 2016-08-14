(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = require('./src/matcher');

},{"./src/matcher":5}],2:[function(require,module,exports){
module.exports = isNumber

/**
 * Determine if something is a non-infinite javascript number.
 * @param  {Number}  n A (potential) number to see if it is a number.
 * @return {Boolean}   True for non-infinite numbers, false for all else.
 */
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
},{}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatusCodeError = function (_Error) {
  _inherits(StatusCodeError, _Error);

  function StatusCodeError(code) {
    _classCallCheck(this, StatusCodeError);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StatusCodeError).call(this, code));

    _this.message = 'Code ' + code + ' is not a valid HTTP status code';
    return _this;
  }

  return StatusCodeError;
}(Error);

var StatusCodeTypeError = function (_Error2) {
  _inherits(StatusCodeTypeError, _Error2);

  function StatusCodeTypeError(code) {
    _classCallCheck(this, StatusCodeTypeError);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(StatusCodeTypeError).call(this, code));

    _this2.message = 'Status code must be a number, got ' + (typeof code === 'undefined' ? 'undefined' : _typeof(code));
    return _this2;
  }

  return StatusCodeTypeError;
}(Error);

module.exports = { StatusCodeError: StatusCodeError, StatusCodeTypeError: StatusCodeTypeError };

},{}],4:[function(require,module,exports){
'use strict';

var _marked = [statusClassSequence].map(regeneratorRuntime.mark);

function statusClassSequence(num) {
  var lengths, extras, i;
  return regeneratorRuntime.wrap(function statusClassSequence$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          lengths = [3, 8, 8, 29, 11];
          extras = [null, [226], null, [431, 444, 451, 499], [599]];
          i = 0;

        case 3:
          if (!(i < lengths[num - 1])) {
            _context.next = 9;
            break;
          }

          _context.next = 6;
          return num * 100 + i;

        case 6:
          i++;
          _context.next = 3;
          break;

        case 9:
          if (!extras[num - 1]) {
            _context.next = 11;
            break;
          }

          return _context.delegateYield(extras[num - 1], 't0', 11);

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

module.exports = statusClassSequence;

},{}],5:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('./errors');

var StatusCodeError = _require.StatusCodeError;
var StatusCodeTypeError = _require.StatusCodeTypeError;

var statusClassSequence = require('./helpers/sequence');
var isNumber = require('isnumber');

var CONSTANTS = {
	INFORMATIONAL: 1,
	SUCCESS: 2,
	REDIRECTION: 3,
	CLIENT_ERROR: 4,
	SERVER_ERROR: 5
};

var validStatusCodes = Object.keys(CONSTANTS).map(function (c) {
	return [].concat(_toConsumableArray(statusClassSequence(CONSTANTS[c])));
}).reduce(function (pr, cr) {
	return pr.concat(cr);
}, []);

var helpers = {
	isInformational: function isInformational(statusCode) {
		return matcher(statusCode) === CONSTANTS.INFORMATIONAL;
	},
	isSuccess: function isSuccess(statusCode) {
		return matcher(statusCode) === CONSTANTS.SUCCESS;
	},
	isRedirection: function isRedirection(statusCode) {
		return matcher(statusCode) === CONSTANTS.REDIRECTION;
	},
	isClientError: function isClientError(statusCode) {
		return matcher(statusCode) === CONSTANTS.CLIENT_ERROR;
	},
	isServerError: function isServerError(statusCode) {
		return matcher(statusCode) === CONSTANTS.SERVER_ERROR;
	}
};

function matcher(code) {

	var statusCode = Number(code);

	if (!isNumber(statusCode) || statusCode === 0) throw new StatusCodeTypeError(code);

	var statusClass = Math.floor(statusCode / 100);

	if (!validStatusCodes.includes(statusCode)) throw new StatusCodeError(code);

	return statusClass;
}

module.exports = Object.assign(CONSTANTS, helpers, { match: matcher });

},{"./errors":3,"./helpers/sequence":4,"isnumber":2}]},{},[1]);
