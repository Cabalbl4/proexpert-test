_namespace = "PROEXPERT.GEOLOCATION";

_namespace.Geolocation = class {    
     currentCoordinates() {
        if ("geolocation" in navigator) {
                return new Promise((resolve, reject)=>{
                    navigator.geolocation.getCurrentPosition((position) => {
                        if(position) {
                            resolve(position);
                        } else {
                            reject();
                        }
                    });
                })
                
        } else {
            return null;    
        }
     }
}