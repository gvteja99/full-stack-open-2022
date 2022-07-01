const dummy = (blogs) => 1

const totalLikes = (obj) => obj.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.likes
  }, 0)

const favoriteBlog = (obj) => obj.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)

module.exports = {
    dummy, totalLikes, favoriteBlog
  }  
  