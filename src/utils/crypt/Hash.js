const bcrypt = require('bcrypt');
const saltRounds = 10;

class Hash {
  constructor(text) {
    this.setText(text)
  }
  
  setText(text) {
    if(text) this.text = text
  }

  hash(text) {
    this.setText(text)
    return new Promise((resolve, reject) => {
      bcrypt.hash(this.text, saltRounds, function(error, hash) {
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