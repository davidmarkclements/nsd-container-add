function awsElb(def) {
  return {
  	name: def.name,
    specifics: {
      repositoryToken: def.repositoryToken
    }
  }
}

module.exports = awsElb;