require('dotenv').config();

const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Express server listening on http://localhost:${port}`);
});
