const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Updated to use express.json() directly

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/integration-cloud', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Allows 5 seconds to select an available server
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    console.error('Ensure your MongoDB URI is correct and the server is up.');
    // Log the entire error object for detailed debugging
    console.error(err);
    process.exit(1); // Exit the process with failure
  }
};

connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});