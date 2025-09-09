function Form({ titulo, imgSrc, descripcion, setTitulo, setImgSRC, setDescripcion, agregarPost }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    agregarPost();
    // Para limpiar campos después de agregar
    setTitulo("");
    setImgSRC("");
    setDescripcion("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="mb-2">
        <h6>Agregar post</h6>
        <label>Título</label>
        <input
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>URL de la imagen</label>
        <input
          value={imgSrc}
          onChange={(event) => setImgSRC(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Descripción</label> <br />
        <textarea
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          className="form-control"
        ></textarea>
      </div>
      <div className="d-flex">
        <button type="submit" className="btn btn-light m-auto">
          Agregar
        </button>
      </div>
    </form>
  );
}

export default Form;
