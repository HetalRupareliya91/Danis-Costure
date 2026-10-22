// Dani's Costure API server
// Every file in src/routes ending with .routes.js is mounted automatically.
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const modules = [];
const routesDir = path.join(__dirname, 'routes');
fs.readdirSync(routesDir)
  .filter((file) => file.endsWith('.routes.js'))
  .sort()
  .forEach((file) => {
    const mod = require(path.join(routesDir, file));
    app.use(mod.base, mod.router);
    if (mod.meta) modules.push(mod.meta);
  });

app.get('/api/health', (req, res) => res.json({ status: 'ok', app: "Dani's Costure" }));
app.get('/api/modules', (req, res) => res.json(modules));
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

app.use('/admin', express.static(path.join(__dirname, '..', '..', 'admin')));
app.use('/', express.static(path.join(__dirname, '..', '..', 'frontend')));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log("Dani's Costure running at http://localhost:" + PORT));
}

module.exports = app;
