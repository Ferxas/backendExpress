import React, {useState, useEffect} from "react";
import axios from "axios";
import { response } from "express";


function App() {
  const [noticias, setNoticias] = useState([]);
  const [nuevaNoticia, setNuevaNoticia] = useState({titulo: '', contenido: ''});

  useEffect(() => {
    axios.get('/api/noticias')
    .then(response => setNoticias(response.data))
    .catch(error => console.error('Error cargando la información', error));
  }, []);

  const handleInputChange = (event) => {
    const {name, value } = event.target;
    setNuevaNoticia({... nuevaNoticia, [name]: value}); 
  }

  const agregarNoticia = () => {
    axios.post('/api/noticias', nuevaNoticia)
    .then(response => {
      setNoticias([...noticias, response.data]);
      setNuevaNoticia({titulo: '', contenido: ''});
    })
    .catch(error => console.error('Error adding noticias', error))
  }


  return (
    <div>
      <h1>Noticias</h1>
      <ul>
        {noticias.map(noticia => (
          <li key={noticia.id}>
            <h3>{noticia.titulo}</h3>
            <p>{noticia.contenido}</p>
          </li>
        ))}
      </ul>

      <div>
        <h2>Agregar noticia</h2>
        <input type="text" name="titulo" placeholder="Título" value={nuevaNoticia.titulo} onChange={handleInputChange} />
        <textarea name="contenido" placeholder="Contenido" value={nuevaNoticia.contenido} onChange={handleInputChange}></textarea>
        <button onClick={agregarNoticia}>Agregar</button>

      </div>
    </div>
  )

}

export default App;