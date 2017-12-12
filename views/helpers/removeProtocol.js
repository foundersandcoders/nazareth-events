module.exports = website =>
  website.split('www.')[1] || website.split('www.')[0];
