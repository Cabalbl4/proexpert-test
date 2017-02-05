"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_namespace = "PROEXPERT.GEOLOCATION";

_namespace.Geolocation = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: "currentCoordinates",
        value: function currentCoordinates() {
            if ("geolocation" in navigator) {
                return new Promise(function (resolve, reject) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        if (position) {
                            resolve(position);
                        } else {
                            reject();
                        }
                    });
                });
            } else {
                return null;
            }
        }
    }]);

    return _class;
}();
//# sourceMappingURL=../maps/geolocation.js.map
