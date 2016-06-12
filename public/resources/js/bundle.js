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

},{"../alt":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _alt2.default();

},{"alt":"alt"}],5:[function(require,module,exports){
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

},{"react":"react"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Guide = function (_Component) {
    _inherits(Guide, _Component);

    function Guide() {
        _classCallCheck(this, Guide);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Guide).apply(this, arguments));
    }

    _createClass(Guide, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                'This is Guide Page',
                _react2.default.createElement('br', null),
                this.props.children
            );
        }
    }]);

    return Guide;
}(_react.Component);

exports.default = Guide;

},{"react":"react"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

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
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                'Step one'
            );
        }
    }]);

    return StepOne;
}(_react.Component);

exports.default = StepOne;

},{"react":"react"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connectToStores = require('../../../../node_modules/alt-utils/lib/connectToStores');

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

},{"../../../../node_modules/alt-utils/lib/connectToStores":1,"../../action/ContentAction":3,"../../store/ContentStore":13,"react":"react"}],9:[function(require,module,exports){
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
                    { to: './content' },
                    'content'
                )
            );
        }
    }]);

    return Home;
}(_react.Component);

exports.default = Home;

},{"react":"react","react-router":"react-router"}],10:[function(require,module,exports){
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

},{"react":"react","react-router":"react-router"}],11:[function(require,module,exports){
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

},{"./route":12,"react":"react","react-dom":"react-dom","react-router":"react-router"}],12:[function(require,module,exports){
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
    _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Guide2.default }),
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

},{"./component/App":5,"./component/guide/Guide":6,"./component/guide/StepOne":7,"./component/manager/Content":8,"./component/manager/Home":9,"./component/manager/Manager":10,"react":"react","react-router":"react-router"}],13:[function(require,module,exports){
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

},{"../action/ContentAction":3,"../alt":4}]},{},[11]);
