function awsAmi(def) {
  return  {
  	name: def.name,
    specifics: {
      repositoryToken: def.repositoryToken
    }
  }
}

module.exports = awsAmi;