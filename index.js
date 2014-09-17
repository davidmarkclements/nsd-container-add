var inquirer = require('inquirer');
var _ = require('lodash');
var argv = require('optimist').argv;
var path = require('path')
var containers = require('./containers.json')
var fs = require('fs')
var home = require('./lib/home')
var commit = require('./lib/commit')
var nsdConfig = require(home('.nscale/data/systems/_sys/systems.json'))
var images = require('./lib/dockerImages')
var sysId = argv._[0];
var imagesHash;
var sys, sysPath, repoParth;

if (!argv._.length || !(sys = nsdConfig[sysId])) { 
  throw ReferenceError('nsd container create <sys> - System ID required')
}

console.log('\nAdd a container to ' + sys.repoName + ' (' + sys.name + ')\n');

repoPath = sys.repoPath;
sysPath = path.join(repoPath, 'system.json')
sys = require(sysPath)

images(function (err, res) {
  if (err) { 
    images = false; 
    return ask();
  }
  images = res.fims;
  imagesHash = _.zipObject(res.fims, res.qims)
  ask();
})

question.s = {
  container: { 
    msg: 'Container type'
  },
  dockerImage: {
    type: 'input',
    msg: 'Docker Image ID',
    when: function (def) { 
      return !images && 
        def.container === _.findKey(containers, {type: 'docker'});
    },
  },
  dockerImages: {
    msg: 'Docker Image ID:',
    choices: function () { return images },
    filter: function (im) {
      return imagesHash[im];
    },
    when: function (def) { 
      return images && 
        def.container === _.findKey(containers, {type: 'docker'});
    }
  },
  repositoryToken: {
    type: 'input',
    msg: 'Repo token',
    when: function (def) {
      return def.container === _.findKey(containers, {type: 'aws-ami'}) || 
        def.container === _.findKey(containers, {type: 'aws-elb'});
    }
  },
  name: {
    type: 'input',
    msg: 'Container name'
  },
  repositoryUrl: {
    msg: 'Container repo url',
    type: 'input',
    when: function (def) {
      return def.container === _.findKey(containers, {type: 'docker'});
    }
  },
  buildScript: {
    msg: 'Build script',
    type: 'input',
    when: function (def) {
      return def.container === _.findKey(containers, {type: 'docker'});
    }
  }

}

function question(name, choices) {
  var q = question.s[name];

  return {
    type: q.type || 'list',
    name: name,
    message: q.msg,
    choices: choices || q.choices,
    when: q.when,
    filter: q.filter
  }
}

function container(def) {
  var cnt = containers[def.container];

  var maker;

  try {
    maker = require('./makers/' + cnt.type)
  } catch (e) {
    maker = function (c) { return c; };
  }

  return _.defaults(cnt, maker instanceof Function ? maker(def) : {});
}

function ask() {
  
  ask.ing = inquirer.prompt([
    question('container', Object.keys(containers)),
    question('dockerImages'),
    question('dockerImage'),
    question('repositoryToken'),
    question('name'),
    question('repositoryUrl'),
    question('buildScript'),
  ], function(def) {

    sys.containerDefinitions.push(container(def));

    fs.writeFileSync(sysPath, JSON.stringify(sys, 0, 2));

    commit(repoPath, function () {
       console.log('Added to container to system ' + sysId) 
    })



  });

}
