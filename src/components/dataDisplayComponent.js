class DataDisplay extends React.Component {
  constructor() {
      super();
      this.state = {
          tempScale: localStorage.getItem("temperature") ? localStorage.getItem("temperature") : "C"
      }
      Object.defineProperty(this,"_tempScale",{
          get() {
              return this.state.tempScale
          },
          set(_v) {
              console.log("Temperature:",_v)
              localStorage.setItem("temperature" ,_v);
              this.setState({tempScale: _v});
          }
      });


  }

  _farenheitToCelsius(_grad) {
      return (_grad - 32) * (5/9);
  };

  _kelvinToFarenheit(_grad) {
     return _grad * (9/5) - 459.67
  }
  _tempConvert(_temp) {
      if(this._tempScale == "C") {
          return this._farenheitToCelsius(this._kelvinToFarenheit(_temp)).toFixed(0);
      } else {
          return this._kelvinToFarenheit(_temp).toFixed(0);
      }
  }

  _tempToggle() {
      if(this._tempScale == "C") {
          this._tempScale = "F";
      } else {
          this._tempScale = "C";
      }
  }

  _weatherNameToImgClass(_name) {
      let dname = "night";
      if(new Date().getHours() > 10 && new Date().getHours() < 18) {
          let dname = "day";
      }

      if(_name === "Clouds") {
          _name = "cloudy";
      }
      
      return "wi wi-" + dname + "-" + _name.toLowerCase();
  }

  render() {
     
    const weather = this.props.weather();
     console.log("Weather re render", weather);
     const tempClass = "circle"+((this._tempScale=="C") ? " right":"");
     const forecasts = [];
     let momentData = moment();
     for(let idx in weather.list) {
            const forecast = weather.list[idx];
            const dayname = momentData.format("dddd"); 
            const temp = this._tempConvert(forecast.temp.day) + "°"+this._tempScale;
            const icon = this._weatherNameToImgClass(forecast.weather[0].main);
            forecasts.push( <div key={idx}>
                <div className="day-name">
                    {dayname}
                </div>
                <div className={"day-icon "+icon}></div>
                <div className="day-temp">
                    {temp}
                </div> 
            </div> ); 
            momentData = momentData.add(1, "days")
      }

 
    return (
        <div className="component data-display">
            <div className="back-arrow" onClick={this.props.destroy}>
                <i className="material-icons">arrow_back</i>
            </div> 
             <div className="location-name">
                {weather.city.name}
             </div>
             <div className="farenheit-celsius-switch" onClick={this._tempToggle.bind(this)}>
                <div className={tempClass}></div>
                 <div className={"temp-name-"+this._tempScale}> {"°"+this._tempScale}</div>
             </div>
             <div className="date-display">
                {moment().format("dddd, MMMM Do YYYY")}
             </div> 
             <div className="today-weather-desc">
                {weather.list[0].weather[0].description}
             </div> 
             <div className="main-weather-screen">
                <div className="temperature">
                    {this._tempConvert(weather.list[0].temp.day)+ "°" +this._tempScale}
                </div>
                <div className="icon">
                   <div className={ this._weatherNameToImgClass(weather.list[0].weather[0].main)}></div> 
                </div>
                <div className="data">
                    <div>Morning: <div className="text"> {this._tempConvert(weather.list[0].temp.morn)+"°"+this._tempScale}</div></div>
                    <div>Day:<div  className="text">  {this._tempConvert(weather.list[0].temp.day)+"°"+this._tempScale}</div></div>
                    <div>Evening: <div className="text"> {this._tempConvert(weather.list[0].temp.eve)+"°"+this._tempScale}</div></div>
                    <div>Night: <div className="text"> {this._tempConvert(weather.list[0].temp.night)+"°"+this._tempScale}</div></div>
                </div>
             </div> 


             <div className="weather-forecast">
                {forecasts}
             </div>

        </div>
    );
  }
}