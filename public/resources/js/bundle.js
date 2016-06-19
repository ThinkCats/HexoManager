(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * 'Higher Order Component' that controls the props of a wrapped
 * component via stores.
 *
 * Expects the Component to have two static methods:
 *   - getStores(): Should return an array of stores.
 *   - getPropsFromStores(props): Should return the props from the stores.
 *
 * Example using old React.createClass() style:
 *
 *    const MyComponent = React.createClass({
 *      statics: {
 *        getStores(props) {
 *          return [myStore]
 *        },
 *        getPropsFromStores(props) {
 *          return myStore.getState()
 *        }
 *      },
 *      render() {
 *        // Use this.props like normal ...
 *      }
 *    })
 *    MyComponent = connectToStores(MyComponent)
 *
 *
 * Example using ES6 Class:
 *
 *    class MyComponent extends React.Component {
 *      static getStores(props) {
 *        return [myStore]
 *      }
 *      static getPropsFromStores(props) {
 *        return myStore.getState()
 *      }
 *      render() {
 *        // Use this.props like normal ...
 *      }
 *    }
 *    MyComponent = connectToStores(MyComponent)
 *
 * A great explanation of the merits of higher order components can be found at
 * http://bit.ly/1abPkrP
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _functions = require('./functions');

function connectToStores(Spec) {
  var Component = arguments.length <= 1 || arguments[1] === undefined ? Spec : arguments[1];
  return (function () {
    // Check for required static methods.
    if (!(0, _functions.isFunction)(Spec.getStores)) {
      throw new Error('connectToStores() expects the wrapped component to have a static getStores() method');
    }
    if (!(0, _functions.isFunction)(Spec.getPropsFromStores)) {
      throw new Error('connectToStores() expects the wrapped component to have a static getPropsFromStores() method');
    }

    var StoreConnection = _react2['default'].createClass({
      displayName: 'Stateful' + (Component.displayName || Component.name || 'Container'),

      getInitialState: function getInitialState() {
        return Spec.getPropsFromStores(this.props, this.context);
      },

      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState(Spec.getPropsFromStores(nextProps, this.context));
      },

      componentDidMount: function componentDidMount() {
        var _this = this;

        var stores = Spec.getStores(this.props, this.context);
        this.storeListeners = stores.map(function (store) {
          return store.listen(_this.onChange);
        });
        if (Spec.componentDidConnect) {
          Spec.componentDidConnect(this.props, this.context);
        }
      },

      componentWillUnmount: function componentWillUnmount() {
        this.storeListeners.forEach(function (unlisten) {
          return unlisten();
        });
      },

      onChange: function onChange() {
        this.setState(Spec.getPropsFromStores(this.props, this.context));
      },

      render: function render() {
        return _react2['default'].createElement(Component, (0, _functions.assign)({}, this.props, this.state));
      }
    });
    if (Component.contextTypes) {
      StoreConnection.contextTypes = Component.contextTypes;
    }

    return StoreConnection;
  })();
}

exports['default'] = connectToStores;
module.exports = exports['default'];
},{"./functions":2,"react":"react"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isPojo = isPojo;
exports.isPromise = isPromise;
exports.eachObject = eachObject;
exports.assign = assign;
var isFunction = function isFunction(x) {
  return typeof x === 'function';
};

exports.isFunction = isFunction;

function isPojo(target) {
  var Ctor = target.constructor;

  return !!target && typeof target === 'object' && Object.prototype.toString.call(target) === '[object Object]' && isFunction(Ctor) && (Ctor instanceof Ctor || target.type === 'AltStore');
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function eachObject(f, o) {
  o.forEach(function (from) {
    Object.keys(Object(from)).forEach(function (key) {
      f(key, from[key]);
    });
  });
}

function assign(target) {
  for (var _len = arguments.length, source = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    source[_key - 1] = arguments[_key];
  }

  eachObject(function (key, value) {
    return target[key] = value;
  }, source);
  return target;
}
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContentAction = function () {
    function ContentAction() {
        _classCallCheck(this, ContentAction);
    }

    _createClass(ContentAction, [{
        key: 'handleClick',
        value: function handleClick(type) {
            return type;
        }
    }]);

    return ContentAction;
}();

exports.default = _alt2.default.createActions(ContentAction);

},{"../alt":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GuideAction = function () {
    function GuideAction() {
        _classCallCheck(this, GuideAction);
    }

    _createClass(GuideAction, [{
        key: 'handleInit',
        value: function handleInit() {
            return null;
        }
    }]);

    return GuideAction;
}();

exports.default = _alt2.default.createActions(GuideAction);

},{"../alt":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _alt2.default();

},{"alt":"alt"}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "custom-content" },
                this.props.children
            );
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;

},{"react":"react"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.json = json;
function json(url, option) {
    return fetch(url, option).then(function (res) {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('fetch data error');
        }
    });
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connectToStores = require('alt-utils/lib/connectToStores');

var _connectToStores2 = _interopRequireDefault(_connectToStores);

var _GuideAction = require('../../action/GuideAction');

var _GuideAction2 = _interopRequireDefault(_GuideAction);

var _GuideStore = require('../../store/GuideStore');

var _GuideStore2 = _interopRequireDefault(_GuideStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PureGuide = function (_Component) {
    _inherits(PureGuide, _Component);

    function PureGuide() {
        _classCallCheck(this, PureGuide);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PureGuide).apply(this, arguments));
    }

    _createClass(PureGuide, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log('guide init');
            _GuideAction2.default.handleInit();
        }
    }, {
        key: 'render',
        value: function render() {
            var stepOne = '';
            var stepTwo = '';
            var stepThree = '';
            var step = this.props.step;
            switch (step) {
                case 2:
                    stepOne = 'completed';
                    stepThree = 'disabled';
                    break;
                case 3:
                    stepOne = 'completed';
                    stepTwo = 'completed';
                    break;
                default:
                    stepTwo = 'disabled';
                    stepThree = 'disabled';
            }
            return _react2.default.createElement(
                'div',
                { className: 'ui text container' },
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'h2',
                    { className: 'ui header' },
                    _react2.default.createElement('i', { className: 'settings icon' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'content' },
                        'Setting Your Hexo '
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui steps' },
                    _react2.default.createElement(
                        'div',
                        { className: stepOne + " step" },
                        _react2.default.createElement('i', { className: 'info icon' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'content' },
                            _react2.default.createElement(
                                'div',
                                { className: 'title' },
                                'Step 1: System Env'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'description' },
                                'You may need git & hexo'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: stepTwo + " step" },
                        _react2.default.createElement('i', { className: 'info icon' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'content' },
                            _react2.default.createElement(
                                'div',
                                { className: 'title' },
                                'Step 2: Hexo Setup'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'description' },
                                'Set up your git and hexo '
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: stepThree + " step" },
                        _react2.default.createElement('i', { className: 'info icon' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'content' },
                            _react2.default.createElement(
                                'div',
                                { className: 'title' },
                                'Step 3: Complete'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'description' },
                                'Enjoy writing your blog'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui attached segment' },
                    this.props.children
                )
            );
        }
    }], [{
        key: 'getStores',
        value: function getStores() {
            return [_GuideStore2.default];
        }
    }, {
        key: 'getPropsFromStores',
        value: function getPropsFromStores() {
            console.log('Global Guide State:', _GuideStore2.default.getState());
            return _GuideStore2.default.getState();
        }
    }]);

    return PureGuide;
}(_react.Component);

var Guide = (0, _connectToStores2.default)(PureGuide);

exports.default = Guide;

},{"../../action/GuideAction":4,"../../store/GuideStore":16,"alt-utils/lib/connectToStores":1,"react":"react"}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StepOne = function (_Component) {
    _inherits(StepOne, _Component);

    function StepOne() {
        _classCallCheck(this, StepOne);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(StepOne).apply(this, arguments));
    }

    _createClass(StepOne, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "ui segment" },
                _react2.default.createElement("br", null),
                _react2.default.createElement("br", null),
                _react2.default.createElement("br", null),
                _react2.default.createElement("br", null),
                _react2.default.createElement("br", null),
                _react2.default.createElement("br", null),
                _react2.default.createElement("br", null),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                    "div",
                    { className: "ui active inverted dimmer" },
                    _react2.default.createElement(
                        "div",
                        { className: "ui medium text loader" },
                        "Checking System ...."
                    )
                )
            );
        }
    }]);

    return StepOne;
}(_react.Component);

exports.default = StepOne;

},{"react":"react"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connectToStores = require('alt-utils/lib/connectToStores');

var _connectToStores2 = _interopRequireDefault(_connectToStores);

var _ContentAction = require('../../action/ContentAction');

var _ContentAction2 = _interopRequireDefault(_ContentAction);

var _ContentStore = require('../../store/ContentStore');

var _ContentStore2 = _interopRequireDefault(_ContentStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = function (_Component) {
    _inherits(Content, _Component);

    function Content() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Content);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Content)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (type) {
            _ContentAction2.default.handleClick(type);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Content, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                'Hahaha ... ',
                _react2.default.createElement('br', null),
                this.props.count,
                ' ',
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                            return _this2.handleClick(0);
                        } },
                    '增加'
                ),
                '  ',
                _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                            return _this2.handleClick(1);
                        } },
                    '减少'
                )
            );
        }
    }], [{
        key: 'getStores',
        value: function getStores() {
            return [_ContentStore2.default];
        }
    }, {
        key: 'getPropsFromStores',
        value: function getPropsFromStores() {
            return _ContentStore2.default.getState();
        }
    }]);

    return Content;
}(_react.Component);

exports.default = (0, _connectToStores2.default)(Content);

},{"../../action/ContentAction":3,"../../store/ContentStore":15,"alt-utils/lib/connectToStores":1,"react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                'Hello Home! ... ',
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/manager/content' },
                    'content'
                )
            );
        }
    }]);

    return Home;
}(_react.Component);

exports.default = Home;

},{"react":"react","react-router":"react-router"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Manager = function (_Component) {
    _inherits(Manager, _Component);

    function Manager() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Manager);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Manager)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleShowSideBar = function () {
            $('.custom-sidebar .ui.sidebar').sidebar('toggle');
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Manager, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $('.custom-sidebar .ui.sidebar').sidebar({
                context: $('.custom-sidebar')
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'custom-sidebar ui bottom attached segment' },
                _react2.default.createElement(
                    'div',
                    { className: 'ui sidebar icon inverted vertical menu' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'item', to: '/', onClick: this.handleShowSideBar },
                        _react2.default.createElement('i', { className: 'home icon' }),
                        'Home'
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'item' },
                        _react2.default.createElement('i', { className: 'block layout icon' }),
                        'Topics'
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'item' },
                        _react2.default.createElement('i', { className: 'smile icon' }),
                        'Friends'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'pusher' },
                    _react2.default.createElement(
                        'button',
                        { onClick: this.handleShowSideBar, className: 'right attached ui black button custom-menu' },
                        'Menu'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        { className: 'ui container' },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return Manager;
}(_react.Component);

exports.default = Manager;

},{"react":"react","react-router":"react-router"}],13:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.browserHistory },
    _route2.default
), document.getElementById('app'));

},{"./route":14,"react":"react","react-dom":"react-dom","react-router":"react-router"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./component/App');

var _App2 = _interopRequireDefault(_App);

var _Manager = require('./component/manager/Manager');

var _Manager2 = _interopRequireDefault(_Manager);

var _Home = require('./component/manager/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Content = require('./component/manager/Content');

var _Content2 = _interopRequireDefault(_Content);

var _Guide = require('./component/guide/Guide');

var _Guide2 = _interopRequireDefault(_Guide);

var _StepOne = require('./component/guide/StepOne');

var _StepOne2 = _interopRequireDefault(_StepOne);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
    _reactRouter.Route,
    { component: _App2.default },
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '/', component: _Manager2.default },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default })
    ),
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '/manager', component: _Manager2.default },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: 'home', component: _Home2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: 'content', component: _Content2.default })
    ),
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '/guide', component: _Guide2.default },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _StepOne2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: 'stepOne', component: _StepOne2.default })
    )
);

},{"./component/App":6,"./component/guide/Guide":8,"./component/guide/StepOne":9,"./component/manager/Content":10,"./component/manager/Home":11,"./component/manager/Manager":12,"react":"react","react-router":"react-router"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _ContentAction = require('../action/ContentAction');

var _ContentAction2 = _interopRequireDefault(_ContentAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContentStore = function ContentStore() {
    var _this = this;

    _classCallCheck(this, ContentStore);

    this.handleClick = function (type) {
        console.log('my type:', type);
        var count = _this.state.count;
        switch (type) {
            case 0:
                count += 1;
                break;
            case 1:
                count -= 1;
                break;
        }
        _this.setState({ count: count });
    };

    this.bindListeners({
        handleClick: _ContentAction2.default.handleClick
    });

    this.state = {
        count: 1
    };
};

exports.default = _alt2.default.createStore(ContentStore, 'ContentStore');

},{"../action/ContentAction":3,"../alt":5}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _GuideAction = require('../action/GuideAction');

var _GuideAction2 = _interopRequireDefault(_GuideAction);

var _Functions = require('../component/common/Functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GuideStore = function GuideStore() {
    var _this = this;

    _classCallCheck(this, GuideStore);

    this.handleInit = function () {
        $.get('/guide/check', function (data) {
            console.log('data:', data);
            if (data) {
                console.log('step:', data.step);
                _this.setState({ step: data.step });
            }
        });
    };

    this.bindListeners({
        handleInit: _GuideAction2.default.handleInit
    });

    this.state = {
        step: -1
    };
};

exports.default = _alt2.default.createStore(GuideStore, 'GuideStore');

},{"../action/GuideAction":4,"../alt":5,"../component/common/Functions":7}]},{},[13]);
