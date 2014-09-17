/**
 * Prepends home directory to supplied dir
 * 
 */

var path = require('path');

module.exports = function (dir) {
  var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
  return path.join(home, dir);
}



