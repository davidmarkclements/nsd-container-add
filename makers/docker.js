
function docker(def) {
  var container = {
  	name: def.name,
    specifics: {
      dockerImageId: def.dockerImages ? def.dockerImages : def.dockerImage
    }
  }

  if (def.repositoryUrl) {
    container.specifics.repositoryUrl = def.repositoryUrl;
  }
  if (def.buildScript) {
    container.specifics.buildScript = def.buildScript
  }

  return container;
}

module.exports = docker;