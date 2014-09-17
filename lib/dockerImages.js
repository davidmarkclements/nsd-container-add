var exec = require('child_process').exec;



module.exports = function (cb) {

	exec('docker images -q --no-trunc', function (err, qims, stderr) {
		if (err || stderr) {
			cb(err || stderr && {msg:stderr});
      return;
		}

    exec('docker images', function (err, fims, stderr) {
      if (err || stderr) {
        cb(err || stderr && {msg:stderr});
        return;
      }
      fims = fims.replace(/\s{2,}/g, ' ').split('\n')
      fims.shift();

      cb(null, {qims: qims.split('\n'), fims: fims})

    });



	})

}