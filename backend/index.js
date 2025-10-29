const express = require('express');
const app = express();
app.use(express.json());

let products = [
  { id: 1, name: 'Camisa', price: 10 },
  { id: 2, name: 'Taza', price: 5 }
];

app.get('/products', (req, res) => res.json(products));
app.post('/products', (req, res) => {
  const id = products.length + 1;
  const p = { id, ...req.body };
  products.push(p);
  res.status(201).json(p);
});

// health for load test
app.get('/health', (req, res) => res.send({status: 'ok'}));

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => console.log(`Backend listening on ${port}`));
}
module.exports = app;
