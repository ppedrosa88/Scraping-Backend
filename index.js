const express = require('express');
const fetchData = require('./utils/fetchData');
const blogRouter = require('./routes/blogRouter');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.text())
app.use(express.urlencoded({ extended: true }));

app.use('/blogs', blogRouter);

// setInterval(async () => {
//     console.log('first')
// }, 4000)

app.listen(port, () => console.log(`Server running on port ${port}`));