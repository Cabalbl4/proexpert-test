"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main() {
    _classCallCheck(this, Main);

    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this));

    _this.weatherProvider = PROEXPERT.DATASTORAGE.weatherProvider;
    _this.state = {
      weather: _this.weatherProvider.lastSaved()
    };
    _this.listener = _this._setWeatherData.bind(_this);
    _this.weatherProvider.subscribe(_this.listener);
    return _this;
  }

  _createClass(Main, [{
    key: "_weather",
    value: function _weather() {
      return this.state.weather;
    }
  }, {
    key: "_setWeatherData",
    value: function _setWeatherData(_weather) {
      console.log("Accept new weather");
      this.setState({ weather: _weather });
    }
  }, {
    key: "_locationAccept",
    value: function _locationAccept(_location) {
      console.log("Accept new location", _location);
      this.weatherProvider.setLocation(_location);
    }
  }, {
    key: "_locationDelete",
    value: function _locationDelete() {
      this.weatherProvider.deleteLocation();
      this.setState({ weather: null });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(Main.prototype.__proto__ || Object.getPrototypeOf(Main.prototype), "componentWillUnmount", this).call(this);
      this.weatherProvider.unsubscribe(this.listener);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.weather) {
        console.log(this.state.weather);
        return React.createElement(DataDisplay, { destroy: this._locationDelete.bind(this), weather: this._weather.bind(this) });
      } else {
        return React.createElement(Location, { locationWaiter: this._locationAccept.bind(this) });
      }
    }
  }]);

  return Main;
}(React.Component);

/**
 * bootstrap
 */


window.onload = function () {
  var appElement = React.createElement(Main, null);
  ReactDOM.render(appElement, document.getElementById("main"));
};
//# sourceMappingURL=../maps/mainComponent.js.map
