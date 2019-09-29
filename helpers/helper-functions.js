const Joi = require("@hapi/joi");

const validateBoolean = array => {
  array.map(item => {
    if (item.completed === 0) {
      item.completed = false;
    } else if (item.completed === 1) {
      item.completed = true;
    }
  });
};

function validatePost(req, res) {
  const newPost = req.body;
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    description: Joi.string().required()
  });
  return schema.validate(newPost);
}

module.exports = {
  validateBoolean,
  validatePost
};
