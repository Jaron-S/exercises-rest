import express from 'express';
import * as exercises from './exercises_model.mjs';

const PORT = 3000;

const app = express();

app.use(express.json());

// Retrieve all the exercises from the database
app.get('/exercises', (req, res) => {
    exercises.getExercises()
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

// Create a new exercise
app.post('/exercises', (req, res) => {
    console.log('processing post request')
    exercises.addExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise.message);
            res.send(exercise);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// update the exercise with the given id
app.put('/exercises/:_id', (req, res) => {
    let update = req.body
    let exercise_id = req.params._id
    exercises.updateExercise(exercise_id, update)
        .then(exercise => {
            res.send(exercise);
        })
        .catch(error => {
            res.status(500).json(error.message);
        })
});

// Delete the exercise with the given id
app.delete('/exercises/:_id', (req, res) => {
    let exercise_id = req.params._id
    exercises.deleteExercise(exercise_id)
        .then(exercise => {
            res.status(204).json(exercise);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});