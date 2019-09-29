const validateBoolean = array => {
  array.map(item => {
    if (item.completed === 0) {
      item.completed = false;
    } else if (item.completed === 1) {
      item.completed = true;
    }
  });
};

module.exports = {
  validateBoolean
};
