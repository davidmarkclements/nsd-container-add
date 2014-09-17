var exec = require('child_process').exec;

module.exports = function (path, cb) {

	exec('git commit system.json timeline.json -m "adding container"', 
    {cwd: path},
    function (err, out, stderr) {
  		if (err || stderr) {
  			cb(err || stderr && {msg:stderr});
        return;
  		}

      cb();

  	})

}