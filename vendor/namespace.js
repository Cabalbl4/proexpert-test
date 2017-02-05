!function(_context) {
var __namespace__ = _context;
    Object.defineProperty(_context, "_namespace_root_context", {
       get: function() {
            return _context;
       }, 
       set: function(_ctx) {
           _context = _ctx;
       }
    });
    Object.defineProperty(_context, "_namespace",{
      get: function() {
        return __namespace__;
      },
      set: function(_ns) {
        var current = null;
        if(typeof _ns == "string") {
              if(_ns.indexOf(".") == 0) {
                current = __namespace__;
                _ns = _ns.substr(1);
              } else {
                current = _context;
              }
          
              var nsArr = _ns.split(".");
              for(var i=0; i<nsArr.length; i++) {
                if(!current[nsArr[i]])
                  current[nsArr[i]] = {};
                  current =  current[nsArr[i]];
              };

        } else {
          current = _ns;
        }
        __namespace__ = current;
      }
    });
}(
  function() {
    var l_gl = null;
    //detect nodeJS
    try {
      l_gl = global;
    } catch(e) {
      l_gl = window;
    }
    return l_gl;
  }()
); 