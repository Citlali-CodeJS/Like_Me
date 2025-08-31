const express = require("express");
const cors = require("cors");
const pool = require("./conexion");

const { obtenerPosts, agregarPost, eliminarPostsNull } = require("./consultas");

const app = express();

app.use(cors());
app.use(express.json());

// Ruta GET
app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta POST
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body;
    await agregarPost(titulo, img, descripcion, likes);
    res.send("Post agregado con éxito");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.listen(3000, () => console.log("Servidor en puerto 3000"));
