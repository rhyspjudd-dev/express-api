const express = require('express');
const prometheusMiddleware = require('express-prometheus-middleware');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 7777;

app.use(cors());

// Middleware to check for valid Authorization header
const checkAuthorization = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== 'mysecrettoken') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

// Prometheus metrics middleware
app.use(prometheusMiddleware());

// Endpoint: /time
app.get('/time', checkAuthorization, (req, res) => {
    const currentTime = Math.floor(Date.now() / 1000);
    res.json({ epoch: currentTime });
  });

// Endpoint: /metrics
app.get('/metrics', checkAuthorization, (req, res) => {
  res.send('Your Prometheus metrics here');
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6