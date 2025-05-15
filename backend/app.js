const express = require('express');
const app = express();

app.use(express.json());  // to parse JSON body

const documents = require('./routes/documents'); // Check path here, relative to app.js
app.use('/api/documents', documents);

app.listen(5050, () => {
  console.log(`Server running on port 5050`);
});
