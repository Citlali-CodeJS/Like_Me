import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";
import { getPosts, addPost, deletePost, likePost } from "./services/postService";
import { successToast, errorToast } from "./utils/toast";

function App() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Obtener posts
  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch {
      errorToast("Error al obtener posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Crear post
  const createPost = async () => {
    if (!titulo || !imgSrc || !descripcion) return;
    const newPost = { titulo, img: imgSrc, descripcion, likes: 0 };
    try {
      const addedPost = await addPost(newPost);
      setPosts([addedPost, ...posts]);
      successToast("Post agregado!");
      // Limpiar formulario
      setTitulo("");
      setImgSRC("");
      setDescripcion("");
    } catch {
      errorToast("Error al agregar post");
    }
  };

  // Dar like
  const likePostById = async (id) => {
    try {
      await likePost(id);
      setPosts(
        posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
      );
    } catch {
      errorToast("Error al dar like");
    }
  };

  // Eliminar post
  const deletePostById = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
      successToast("Post eliminado!");
    } catch {
      errorToast("Error al eliminar post");
    }
  };

  return (
    <div className="App container">
      <h2 className="py-5 text-center">📸 Like Me 📸</h2>

      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            titulo={titulo}
            imgSrc={imgSrc}
            descripcion={descripcion}
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={createPost}
          />
        </div>

        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              like={() => likePostById(post.id)}
              eliminarPost={() => deletePostById(post.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
