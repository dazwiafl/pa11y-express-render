var _ = require('lodash')
  , tmp = require('tmp')
  , fs = require('fs')
  , pa11y = require('pa11y')
  , fs = require('fs')
;

const _defaults = {
  active: false
};

module.exports = function(opts){
  opts = Object.assign({}, _defaults, opts);

  var pa11yTest = pa11y(opts.pa11yOptions);

  return function(req, res, next){
    if(opts.active === false) return next();
    var _render = res.render;

    res.render = function(view, options, callback){
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else if (!options) {
        options = {};
        callback = undefined;
      }

      _render.call(this, view, options, function(err, html){
        var _finish = function(){
          if(callback !== undefined) return callback(err, html);
          res.send(html);
        };

        if(err) return _finish();

        var fnName = tmp.tmpNameSync()+".html";

        fs.writeFileSync(fnName, html);
        pa11yTest.run("file://"+fnName, function(error, results){
          fs.unlink(fnName);
          if(!error && results.length > 0){
            html += "<script type='text/javascript'>"
            _.each(results, function(r){ html += "console.log('pa11y "+r.type+":'); console.log('%c'+decodeURIComponent('"+encodeURIComponent(JSON.stringify(r, null, 2)).split("'").join("\\'")+"'), 'background: rgba(0,0,0,.15); display: block;'); console.log('---');\n" });
            html += "</script>";
          }
          _finish();
        });
      })
    };
    next();
  }
}
