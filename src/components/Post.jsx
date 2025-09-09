function Post({
  post: { id, titulo, img, descripcion, likes },
  like,
  eliminarPost,
}) {
  return (
    <div className="card col-12 col-sm-4 d-inline mx-0 px-3">
      <div className="card-body p-0">

        <img className="card-img-top" src={img} alt={titulo} />

        <div className="p-3">

          <h4 className="card-title">{titulo}</h4>

     
          <p className="card-text">{descripcion}</p>

         
          <div className="d-flex justify-content-between align-items-center">
           
            <div
              className="d-flex align-items-center text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => like(id)}
            >
              <i className="fa-solid fa-heart fa-xl"></i>
              <span className="ms-2">{likes}</span>
            </div>

        
            <i
              className="fa-solid fa-x text-danger"
              style={{ cursor: "pointer", fontSize: "1.2rem" }}
              onClick={() => eliminarPost(id)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

