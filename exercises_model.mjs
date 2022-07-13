import mongoose from 'mongoose';

// Prepare the database in the MongoDB server
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to the database
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Define the schema
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true},
    date: { type: String, required: true}
});

// Compile the model for the schema
const Exercise = mongoose.model("Exercise", exerciseSchema);

// return all the exercises
const getExercises = async () => {
    const query = Exercise.find();
    return query.exec();
}

// add an exercise
const addExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save()
}

// update an exercise by id
const updateExercise = async (id, update) => {
    const exercise = await Exercise.findOneAndUpdate({"_id": id}, update);
    return exercise
}

// delete an exercise by id
const deleteExercise = async (id) => {
    const result = await Exercise.deleteOne({ _id: id})
}

export { getExercises, addExercise, updateExercise, deleteExercise }