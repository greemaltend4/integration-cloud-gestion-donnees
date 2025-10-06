const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Updated to use express.json() directly

// Connect to MongoDB
const connectDB = async () => {
  for (let i = 0; i < 5; i++) { // Retry up to 5 times
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/integration-cloud', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Allows 5 seconds to select an available server
      });
      console.log('MongoDB connected...');
      return;
    } catch (err) {
      console.error(`Attempt ${i + 1}: Failed to connect to MongoDB:`, err.message);
      console.error('Ensure your MongoDB URI is correct and the server is up.');
      if (i === 4) { // Last attempt
        console.error(err);
        process.exit(1); // Exit the process with failure
      }
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
    }
  }
};

connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});