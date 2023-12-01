const app = require('./server');

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT} V3`);
});
