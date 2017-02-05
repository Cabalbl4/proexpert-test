class Location extends React.Component {
  constructor() {
      super();
      this.geolocation = new PROEXPERT.GEOLOCATION.Geolocation();
      this.cityproposal = ""; 
  }
  render() {
    return (
      <div className="component location-picker">
        <div className="name-input">
            <input required placeholder="input city" onChange={(input) => {this.cityproposal = input.target.value}}
            ref={ (input) => { if(input) input.onkeypress=(e) => { if(e.keyCode == 13) this._toggleCity() }}}
            ></input>
            <button onClick={this._toggleCity.bind(this)}><i className="material-icons">search</i></button>
        </div>
        <div className="location-orspacer">or</div>
        <div className="location-linkholder">use my <a className="location-geo-link" href="#" onClick={this._calculateGeo.bind(this)}>current position</a></div>
      </div>
    );
  }

  _fireLocation(_location) {
      this.props.locationWaiter(_location);
  }

  _toggleCity() {
      console.log("city", this.cityproposal);
      if(! this.cityproposal) {
          return;
      }
      this._fireLocation({
          name: this.cityproposal
      });
  }

  _calculateGeo(_e) {
      _e.preventDefault();
      console.log("calculateGeo");
      const geoPromise = this.geolocation.currentCoordinates();
      if(! geoPromise) {
            alert("Error getting coordinates");
      } else {
          geoPromise.then((coords)=>{
              this._fireLocation({
                    pos: {
                        lat: coords.coords.latitude,
                        lon: coords.coords.longitude
                    }
                });
          }, ()=>{
              alert("Error getting coordinates");
          });
      }
  }
}
