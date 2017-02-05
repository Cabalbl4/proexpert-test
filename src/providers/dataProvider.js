_namespace = "PROEXPERT.DATASTORAGE";

_namespace.weatherProvider = function() {
     class WeatherProvider {
        constructor(_config) {
            this.api_key = _config.api_key;
            this.api_url = _config.api_url;
            this.interval = _config.data_check_interval_seconds;
            this.location = null;

           

            this.daycount = 7;
            this.subscribers = [];
            this.check = () => {
                console.log("check")
                if(! this. location) {
                    return;
                }
                $.get( this.api_url+this.buildQuery(), ( data ) => {
                    console.log("got data", data);
                    localStorage.setItem("_lastLocation", JSON.stringify( this.location));
                    localStorage.setItem("_lastWeather", JSON.stringify(data));
                    this.subscribers.forEach((subscriber)=>subscriber(data));
                }, "json" );
            };

             try {
              this.setLocation( JSON.parse(localStorage.getItem("_lastLocation"))) ;
            } catch(e) {

            }
        }

        buildQuery() {
            //api.openweathermap.org/data/2.5/weather?q=London,uk
            //api.openweathermap.org/data/2.5/weather?lat=35&lon=139
            if(! this.location) {
                return null;
            }
            if(this.location.name) {
                return `?q=${this.location.name}&APPID=${this.api_key}&cnt=${this.daycount}`;
            }
            return `?lat=${this.location.pos.lat}&lon=${this.location.pos.lon}&APPID=${this.api_key}&cnt=${this.daycount}`;
        }

        deleteLocation() {
            localStorage.removeItem("_lastLocation");
            localStorage.removeItem("_lastWeather");
            this.location = null;
            this.terminate();
        }

        setLocation(_location) {
            if(JSON.stringify(this.location) !== JSON.stringify(_location)) {
                           localStorage.removeItem("_lastLocation");
                           localStorage.removeItem("_lastWeather");
            }

            this.location = _location;
            this.terminate();
            this.__checkInterval = setInterval(this.check, this.interval*1000);
            setTimeout(this.check, 0);
        }

        lastSaved() {
            try {
              return JSON.parse(localStorage.getItem("_lastWeather"));
            } catch(e) {
                return null;
            }
        };

        subscribe(_what) {
            this.subscribers.push(_what);
        }

        unsubscribe(_what) {
            const pos = this.subscribers.indexOf(_what);
            if(pos != -1) {
                this.subscribers.splice(pos,1);
            }

        }
        terminate() {
            clearInterval(this.__checkInterval);
        }


    }
    
    return new  WeatherProvider(GL_CONFIG);
}()