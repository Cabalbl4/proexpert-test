"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataDisplay = function (_React$Component) {
    _inherits(DataDisplay, _React$Component);

    function DataDisplay() {
        _classCallCheck(this, DataDisplay);

        var _this = _possibleConstructorReturn(this, (DataDisplay.__proto__ || Object.getPrototypeOf(DataDisplay)).call(this));

        _this.state = {
            tempScale: localStorage.getItem("temperature") ? localStorage.getItem("temperature") : "C"
        };
        Object.defineProperty(_this, "_tempScale", {
            get: function get() {
                return this.state.tempScale;
            },
            set: function set(_v) {
                console.log("Temperature:", _v);
                localStorage.setItem("temperature", _v);
                this.setState({ tempScale: _v });
            }
        });

        return _this;
    }

    _createClass(DataDisplay, [{
        key: "_parseCurrentTemp",
        value: function _parseCurrentTemp(_object) {
            var hours = new Date().getHours();
            if (hours < 6) {
                return _object.night;
            } else if (hours < 12) {
                return _object.morn;
            } else if (hours < 18) {
                return _object.day;
            } else if (hours < 22) {
                return _object.eve;
            } else {
                return _object.night;
            }
        }
    }, {
        key: "_farenheitToCelsius",
        value: function _farenheitToCelsius(_grad) {
            return (_grad - 32) * (5 / 9);
        }
    }, {
        key: "_kelvinToFarenheit",
        value: function _kelvinToFarenheit(_grad) {
            return _grad * (9 / 5) - 459.67;
        }
    }, {
        key: "_tempConvert",
        value: function _tempConvert(_temp) {
            if (this._tempScale == "C") {
                return this._farenheitToCelsius(this._kelvinToFarenheit(_temp)).toFixed(0);
            } else {
                return this._kelvinToFarenheit(_temp).toFixed(0);
            }
        }
    }, {
        key: "_tempToggle",
        value: function _tempToggle() {
            if (this._tempScale == "C") {
                this._tempScale = "F";
            } else {
                this._tempScale = "C";
            }
        }
    }, {
        key: "_weatherNameToImgClass",
        value: function _weatherNameToImgClass(_name) {
            var dname = "night";
            if (new Date().getHours() > 10 && new Date().getHours() < 18) {
                var _dname = "day";
            }

            if (_name === "Clouds") {
                _name = "cloudy";
            }

            return "wi wi-" + dname + "-" + _name.toLowerCase();
        }
    }, {
        key: "render",
        value: function render() {

            var weather = this.props.weather();
            console.log("Weather re render", weather);
            var tempClass = "circle" + (this._tempScale == "C" ? " right" : "");
            var forecasts = [];
            var momentData = moment();
            for (var idx in weather.list) {
                var forecast = weather.list[idx];
                var dayname = momentData.format("dddd");
                var temp = this._tempConvert(weather.list[0].temp.day) + "°" + this._tempScale;
                var icon = this._weatherNameToImgClass(forecast.weather[0].main);
                forecasts.push(React.createElement(
                    "div",
                    { key: idx },
                    React.createElement(
                        "div",
                        { className: "day-name" },
                        dayname
                    ),
                    React.createElement("div", { className: "day-icon " + icon }),
                    React.createElement(
                        "div",
                        { className: "day-temp" },
                        temp
                    )
                ));
                momentData = momentData.add(1, "days");
            }

            return React.createElement(
                "div",
                { className: "component data-display" },
                React.createElement(
                    "div",
                    { className: "back-arrow", onClick: this.props.destroy },
                    React.createElement(
                        "i",
                        { className: "material-icons" },
                        "arrow_back"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "location-name" },
                    weather.city.name
                ),
                React.createElement(
                    "div",
                    { className: "farenheit-celsius-switch", onClick: this._tempToggle.bind(this) },
                    React.createElement("div", { className: tempClass }),
                    React.createElement(
                        "div",
                        { className: "temp-name-" + this._tempScale },
                        " ",
                        "°" + this._tempScale
                    )
                ),
                React.createElement(
                    "div",
                    { className: "date-display" },
                    moment().format("dddd, MMMM Do YYYY")
                ),
                React.createElement(
                    "div",
                    { className: "today-weather-desc" },
                    weather.list[0].weather[0].description
                ),
                React.createElement(
                    "div",
                    { className: "main-weather-screen" },
                    React.createElement(
                        "div",
                        { className: "temperature" },
                        this._tempConvert(this._parseCurrentTemp(weather.list[0].temp)) + "°" + this._tempScale
                    ),
                    React.createElement(
                        "div",
                        { className: "icon" },
                        React.createElement("div", { className: this._weatherNameToImgClass(weather.list[0].weather[0].main) })
                    ),
                    React.createElement(
                        "div",
                        { className: "data" },
                        React.createElement(
                            "div",
                            null,
                            "Morning: ",
                            React.createElement(
                                "div",
                                { className: "text" },
                                " ",
                                this._tempConvert(weather.list[0].temp.morn) + "°" + this._tempScale
                            )
                        ),
                        React.createElement(
                            "div",
                            null,
                            "Day:",
                            React.createElement(
                                "div",
                                { className: "text" },
                                "  ",
                                this._tempConvert(weather.list[0].temp.day) + "°" + this._tempScale
                            )
                        ),
                        React.createElement(
                            "div",
                            null,
                            "Evening: ",
                            React.createElement(
                                "div",
                                { className: "text" },
                                " ",
                                this._tempConvert(weather.list[0].temp.eve) + "°" + this._tempScale
                            )
                        ),
                        React.createElement(
                            "div",
                            null,
                            "Night: ",
                            React.createElement(
                                "div",
                                { className: "text" },
                                " ",
                                this._tempConvert(weather.list[0].temp.night) + "°" + this._tempScale
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "weather-forecast" },
                    forecasts
                )
            );
        }
    }]);

    return DataDisplay;
}(React.Component);
//# sourceMappingURL=../maps/dataDisplayComponent.js.map
