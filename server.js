const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3301;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// mongoose Connect
mongoose.connect(
  // if found in .env, else use this
  process.env.MONGODB_URI || `mongodb://localhost:27017/socialnetworkapi`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
//   use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
