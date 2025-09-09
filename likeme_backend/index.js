const express = require("express");
const cors = require("cors");
const pool = require("./conexion");

const { obtenerPosts, agregarPost } = require("./consultas");

const app = express();

app.use(cors());
app.use(express.json());

// Ruta GET: Obtener todos los posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta POST: Crear un nuevo post
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body;

  
    const result = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, img, descripcion, likes]
    );

    res.json(result.rows[0]); 
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta PUT: Actualizar un post 
app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, img, descripcion } = req.body;

    const result = await pool.query(
      "UPDATE posts SET titulo=$1, img=$2, descripcion=$3 WHERE id=$4 RETURNING *",
      [titulo, img, descripcion, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Post no encontrado");
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta DELETE: Eliminar un post 
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM posts WHERE id=$1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Post no encontrado");
    }

    res.send("Post eliminado con éxito");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Iniciar servidor
app.listen(3000, () => console.log("Servidor en puerto 3000"));
