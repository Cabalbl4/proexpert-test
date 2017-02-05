"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Location = function (_React$Component) {
    _inherits(Location, _React$Component);

    function Location() {
        _classCallCheck(this, Location);

        var _this = _possibleConstructorReturn(this, (Location.__proto__ || Object.getPrototypeOf(Location)).call(this));

        _this.geolocation = new PROEXPERT.GEOLOCATION.Geolocation();
        _this.cityproposal = "";
        return _this;
    }

    _createClass(Location, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "component location-picker" },
                React.createElement(
                    "div",
                    { className: "name-input" },
                    React.createElement("input", { required: true, placeholder: "input city", onChange: function onChange(input) {
                            _this2.cityproposal = input.target.value;
                        },
                        ref: function ref(input) {
                            if (input) input.onkeypress = function (e) {
                                if (e.keyCode == 13) _this2._toggleCity();
                            };
                        }
                    }),
                    React.createElement(
                        "button",
                        { onClick: this._toggleCity.bind(this) },
                        React.createElement(
                            "i",
                            { className: "material-icons" },
                            "search"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "location-orspacer" },
                    "or"
                ),
                React.createElement(
                    "div",
                    { className: "location-linkholder" },
                    "use my ",
                    React.createElement(
                        "a",
                        { className: "location-geo-link", href: "#", onClick: this._calculateGeo.bind(this) },
                        "current position"
                    )
                )
            );
        }
    }, {
        key: "_fireLocation",
        value: function _fireLocation(_location) {
            this.props.locationWaiter(_location);
        }
    }, {
        key: "_toggleCity",
        value: function _toggleCity() {
            console.log("city", this.cityproposal);
            if (!this.cityproposal) {
                return;
            }
            this._fireLocation({
                name: this.cityproposal
            });
        }
    }, {
        key: "_calculateGeo",
        value: function _calculateGeo(_e) {
            var _this3 = this;

            _e.preventDefault();
            console.log("calculateGeo");
            var geoPromise = this.geolocation.currentCoordinates();
            if (!geoPromise) {
                alert("Error getting coordinates");
            } else {
                geoPromise.then(function (coords) {
                    _this3._fireLocation({
                        pos: {
                            lat: coords.coords.latitude,
                            lon: coords.coords.longitude
                        }
                    });
                }, function () {
                    alert("Error getting coordinates");
                });
            }
        }
    }]);

    return Location;
}(React.Component);
//# sourceMappingURL=../maps/locationComponent.js.map
