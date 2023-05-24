const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const studentArray = require('./InitialData');


app.get('/api/student', (req, res) => {
  res.json(studentArray);
});


app.get('/api/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = studentArray.find((s) => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

app.post('/api/student', (req, res) => {
  const { name, currentClass, division } = req.body;
  if (!name || !currentClass || !division) {
    res.status(400).send('Incomplete details');
  } else {
    const newStudent = {
      id: studentArray.length + 1,
      name,
      currentClass,
      division,
    };
    studentArray.push(newStudent);
    res.json({ id: newStudent.id });
  }
});


app.put('/api/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const student = studentArray.find((s) => s.id === id);
  if (!student) {
    res.status(400).send('Invalid ID');
  } else if (!name) {
    res.status(400).send('Invalid update');
  } else {
    student.name = name;
    res.send('Student details updated');
  }
});


app.delete('/api/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = studentArray.findIndex((s) => s.id === id);
  if (index === -1) {
    res.status(404).send('Student not found');
  } else {
    studentArray.splice(index, 1);
    res.send('Student record deleted');
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
