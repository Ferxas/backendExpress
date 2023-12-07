const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3001;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "newsproject",
});

db.connect((err) => {
  if (err) {
    console.error("Error en la conexión " + err.stack);
    return;
  }
  console.log("Se ha establecido la conexión a MySQL como id " + db.threadId);
});

app.get("/api/noticias", (req, res) => {
  db.query("SELECT * from noticias", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/api/noticias", (req, res) => {
  const { titulo, contenido } = req.body;
  db.query(
    "INSERT INTO noticias (titulo, contenido) VALUES (?, ?)",
    [titulo, contenido],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.put('/api/noticias/:id', (req, res) => {
const { id } = req.params;
const { titulo, contenido } = req.body;
db.query('UPDATE noticias SET titulo=?, contenido=? WHERE id=?',[titulo,contenido,id], (err, result) => {
  if (err) throw err;
  res.send(result);
});
});

app.delete('/api/noticias/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM noticias WHERE id=?', [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
})