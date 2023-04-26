const bcrypt = require('bcrypt');

class Hash {
  static saltRounds = 10;
  
  constructor(text) {
    this.setText(text)
  }
  
  setText(text) {
    if(text) this.text = text
  }

  hash(text) {
    this.setText(text)
    return new Promise((resolve, reject) => {
      bcrypt.hash(this.text, Hash.saltRounds, function(error, hash) {
        if(error) reject(error)
        resolve(hash)
      })
    })
  }
  
  compare(hash, text){
    this.setText(text)
    return new Promise((resolve, reject) => {
      bcrypt.compare(this.text, hash, function(error, result) {
        if(error) reject(error)
        resolve(result)
      })
    })
  }
}

module.exports = Hash