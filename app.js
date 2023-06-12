const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

const port = 3000;

app.listen(port, () => {
	console.log(`Express server listening on http://localhost:${port}`);
});
