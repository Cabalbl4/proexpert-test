class Main extends React.Component {
  constructor() {
    super();
    this.weatherProvider = PROEXPERT.DATASTORAGE.weatherProvider;
    this.state = {
      weather: this.weatherProvider.lastSaved()
    } 
    this.listener = this._setWeatherData.bind(this)
    this.weatherProvider.subscribe(this.listener);
  }

  _weather() {
    return this.state.weather;
  }

  _setWeatherData(_weather) {
      console.log("Accept new weather");
      this.setState({weather: _weather});
  }

  _locationAccept(_location) {
    console.log("Accept new location", _location);
    this.weatherProvider.setLocation(_location);
  }

  _locationDelete() {
    this.weatherProvider.deleteLocation();
    this.setState({weather: null});
  } 

  componentWillUnmount() {
    super.componentWillUnmount();
    this.weatherProvider.unsubscribe(this.listener);
  }

  render() {
   if(this.state.weather) {
     console.log(this.state.weather);
     return <DataDisplay destroy={this._locationDelete.bind(this)} weather={this._weather.bind(this)}/>
   } else {
      return (
        <Location locationWaiter={this._locationAccept.bind(this) }/>
      );
   }
  }
}


/**
 * bootstrap
 */
window.onload=function() {
    const appElement = <Main/>;
    ReactDOM.render(appElement, document.getElementById("main"));
}