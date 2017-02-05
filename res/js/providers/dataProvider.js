"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_namespace = "PROEXPERT.DATASTORAGE";

_namespace.weatherProvider = function () {
    var WeatherProvider = function () {
        function WeatherProvider(_config) {
            var _this = this;

            _classCallCheck(this, WeatherProvider);

            this.api_key = _config.api_key;
            this.api_url = _config.api_url;
            this.interval = _config.data_check_interval_seconds;
            this.location = null;

            this.daycount = 7;
            this.subscribers = [];
            this.check = function () {
                console.log("check");
                if (!_this.location) {
                    return;
                }
                $.get(_this.api_url + _this.buildQuery(), function (data) {
                    console.log("got data", data);
                    localStorage.setItem("_lastLocation", JSON.stringify(_this.location));
                    localStorage.setItem("_lastWeather", JSON.stringify(data));
                    _this.subscribers.forEach(function (subscriber) {
                        return subscriber(data);
                    });
                }, "json");
            };

            try {
                this.setLocation(JSON.parse(localStorage.getItem("_lastLocation")));
            } catch (e) {}
        }

        _createClass(WeatherProvider, [{
            key: "buildQuery",
            value: function buildQuery() {
                //api.openweathermap.org/data/2.5/weather?q=London,uk
                //api.openweathermap.org/data/2.5/weather?lat=35&lon=139
                if (!this.location) {
                    return null;
                }
                if (this.location.name) {
                    return "?q=" + this.location.name + "&APPID=" + this.api_key + "&cnt=" + this.daycount;
                }
                return "?lat=" + this.location.pos.lat + "&lon=" + this.location.pos.lon + "&APPID=" + this.api_key + "&cnt=" + this.daycount;
            }
        }, {
            key: "deleteLocation",
            value: function deleteLocation() {
                localStorage.removeItem("_lastLocation");
                localStorage.removeItem("_lastWeather");
                this.location = null;
                this.terminate();
            }
        }, {
            key: "setLocation",
            value: function setLocation(_location) {
                if (JSON.stringify(this.location) !== JSON.stringify(_location)) {
                    localStorage.removeItem("_lastLocation");
                    localStorage.removeItem("_lastWeather");
                }

                this.location = _location;
                this.terminate();
                this.__checkInterval = setInterval(this.check, this.interval * 1000);
                setTimeout(this.check, 0);
            }
        }, {
            key: "lastSaved",
            value: function lastSaved() {
                try {
                    return JSON.parse(localStorage.getItem("_lastWeather"));
                } catch (e) {
                    return null;
                }
            }
        }, {
            key: "subscribe",
            value: function subscribe(_what) {
                this.subscribers.push(_what);
            }
        }, {
            key: "unsubscribe",
            value: function unsubscribe(_what) {
                var pos = this.subscribers.indexOf(_what);
                if (pos != -1) {
                    this.subscribers.splice(pos, 1);
                }
            }
        }, {
            key: "terminate",
            value: function terminate() {
                clearInterval(this.__checkInterval);
            }
        }]);

        return WeatherProvider;
    }();

    return new WeatherProvider(GL_CONFIG);
}();
//# sourceMappingURL=../maps/dataProvider.js.map
