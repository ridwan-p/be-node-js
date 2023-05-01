const bcrypt = require('bcrypt');

class Hash {
  #saltRounds = 10;
  
  constructor(text) {
    this.setText(text)
  }
  
  setText(text) {
    if(text) this.text = text
    return this
  }

  getSaltRounds() {
    return this.#saltRounds
  }

  setSaltRounds(value) {
    this.#saltRounds = value
    return this
  }

  hash(text) {
    this.setText(text)
    return new Promise((resolve, reject) => {
      bcrypt.hash(this.text, this.getSaltRounds(), function(error, hash) {
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