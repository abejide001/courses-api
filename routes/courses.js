const express = require('express');
const Joi = require('joi');

const router = express.Router();

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
  };
  return Joi.validate(course, schema);
}
const courses = [
  {
    id: 1,
    name: 'chem',
  },
  {
    id: 2,
    name: 'phy',
  },
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === Number(req.params.id));
  if (!course) return res.status(404).send('course not found');
  return res.send(course);
});

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
router.put('/:id', (req, res) => {
  const course = courses.find(c => c.id === Number(req.params.id));
  if (!course) res.status(404).send('course not found');
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});
router.delete('/:id', (req, res) => {
  const course = courses.find(c => c.id === Number(req.params.id));
  if (!course) res.status(404).send('course not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});
module.exports = router;
