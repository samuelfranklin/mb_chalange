const express = require('express');
const Datastore = require('nedb-promises');

const app = express();

app.use(express.json());

const db = Datastore.create({ filename: './database/users.db'});

const PORT = 3000;

const API_RESULTS = {
    success: (data) => ({ success: true, data }),
    error: (errors) => ({ success: false, errors: [...errors]  })
};

// #region Api Routes

app.post('/users', async (req, res) => {
    try {
        const newUser = req.body;
        const existingEmail = await db.findOne({ email: newUser.email });
        const existingUsername = await db.findOne({ username: newUser.username });

        if(existingEmail) return res.result(400).send(API_RESULTS.error(['EMAIL_EXISTS']));
        if(existingUsername) return res.status(400).send(API_RESULTS.error(['USERNAME_EXISTS']));
        if (!newUser.email || !newUser.username || !newUser.password) return res.status(400).send(API_RESULTS.error(['MISSING_FIELDS']));
        if(newUser.password.length < 8) return res.status(400).send(API_RESULTS.error(['PASSWORD_TOO_SHORT']));

        const user = await db.insert(newUser);
        res.status(201).send(API_RESULTS.success(user));
    } catch (error) {
        return res.status(500).send(API_RESULTS.error([{ _id: 'SERVER_ERROR', message: error.message, error }]));
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await db.find({});
        res.status(200).send(API_RESULTS.success(users));
    } catch (error) {
        return res.status(500).send(API_RESULTS.error([{ _id: 'SERVER_ERROR', message: error.message, error }]));
    }
});
// #endregion


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
