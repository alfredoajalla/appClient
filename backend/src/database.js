import mongoose from 'mongoose';

(async () => {
    const db = await mongoose.connect('mongodb://localhost/PracticalDB',
        { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('Connected to database'+ db.connection.name))
    .catch(err => console.log(err));
})();

