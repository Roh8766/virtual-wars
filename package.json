const express = require('express');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(__dirname));

// Required for Cloud Run
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
