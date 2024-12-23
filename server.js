const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/foodDelivery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  gender: String,
  username: { type: String, unique: true },
  password: String,
});

const orderSchema = new mongoose.Schema({
  username: String,
  items: Array,
  phone: String,
  address: String,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

app.use(express.static('public'));
app.use(bodyParser.json());

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.json({ message: 'Registration successful!' });
  } catch (err) {
    res.status(400).json({ message: 'Username already exists.' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    res.json({ success: true });
  } else {
    res.status(400).json({ message: 'Invalid credentials.' });
  }
});

// Order submission endpoint
app.post('/submit-order', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: 'Order placed successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
