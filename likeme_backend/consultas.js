const pool = require("./conexion");

// Obtener todos los posts
const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

// Agregar un nuevo post
const agregarPost = async (titulo, img, descripcion, likes) => {
  const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, img, descripcion, likes]; 
  await pool.query(consulta, values);
  return "Post agregado con éxito";
};


const eliminarPostsNull = async () => {
  const consulta = `
    DELETE FROM posts
    WHERE titulo IS NULL AND descripcion IS NULL AND img IS NULL
  `;
  await pool.query(consulta);
  return "Posts con null eliminados";
};

// Eliminar posts por IDs
const eliminarPostsPorIds = async (ids) => {
  const consulta = `DELETE FROM posts WHERE id = ANY($1)`;
  await pool.query(consulta, [ids]);
  return `Posts con IDs ${ids.join(", ")} eliminados`;
};

module.exports = { obtenerPosts, agregarPost, eliminarPostsNull, eliminarPostsPorIds };



