var array = require('lodash/array');
var object = require('lodash/fp/object');

const dummy = (blogs) => 1

const totalLikes = (obj) => obj.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.likes
  }, 0)

const favoriteBlog = (obj) => obj.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)

const mostBlogs = (blogs) => {
  const obj = blogs.reduce(function (acc, curr) {
    return acc[curr.author] ? ++acc[curr.author] : acc[curr.author] = 1, acc
  }, {})
  
  const key = Object.keys(obj).reduce((prev, current) => (obj[prev] > obj[current]) ? prev : current)  
  let res = {};

  res[key] = obj[key];

  return res
}

const mostLikes = (blogs) => {
  const obj = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)

  let res = {};
  res['author'] = obj['author']
  res['likes'] = obj['likes']
  
  return res
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }  
  