const dummy = (blogs) => 1

const totalLikes = (obj) => obj.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.likes
  }, 0)

module.exports = {
    dummy, totalLikes
  }  
  