import React from "react";
import { useNavigate } from "react-router";
import "./AboutUs.scss";
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="AboutUs">
      <h1>Sobre Nosotros</h1>
      <article>
        <h2>Trabajo Integrador Programación III</h2>
      </article>
      <div className="wrapper">
        <article>
          <h2>¿En qué consiste nuetra e-commerce?</h2>
          <p>
            Nuestro sitio se dedicará principalmente a la venta de discos de
            música físicos y digitales, como vinilos, CD’s o DVD Blu Ray. Aunque
            también contará con ediciones especiales y ofertas.
          </p>
        </article>
        <article>
          <h2>Público objetivo</h2>
          <p>
            Apunta a un tipo de público adulto-adolescente al que le interese
            adquirir productos de sus artistas favoritos y que le brinden la
            sensación de un estilo retro-vintage, por mero coleccionismo, o
            incluso fanáticos que quieran apoyar a los artistas directamente
            comprando sus discos físicos o digitales.
          </p>
        </article>
        <article>
          <h2>¿Cómo ajustaremos nuestra oferta a ese público?</h2>
          <p>
            Ajustaremos nuestra oferta al distribuir música para los fanáticos
            de los artistas e introducirlos a maneras o vías de poder apoyarlos,
            comprando discos para coleccionarlos o para escucharlos. Contaremos
            con la posibilidad de escuchar una pieza del álbum como de una
            canción en específico de este mismo, con el fin de poder decidir si
            adquirirlo o no, además de esta manera se atrae a los compradores
            potenciales, ya que no es lo mismo intentar vender a través de la
            imagen de una canción o álbum que directamente experimentar el
            sonido por sí mismo. Pondremos filtros para aquellas canciones que
            en sus letras contengan palabras inapropiadas y etiquetaremos cada
            canción con un “explicit ” en caso de tener palabras inapropiadas
          </p>
        </article>
      </div>
      <article>
        <h2>Integrantes</h2>
      </article>
      <div className="integrantes-wrapper">
        <article>
          <img src="/Images/Marcos.png" alt="" />
          <h2>Antón Marcos</h2>
          <h3>Back End Developer</h3>
          <div className="habilities">
            <h1>Habilidades:</h1>
            <span> GeneXus = Nivel Intermedio</span>
            <span> Java = Nivel Intermedio</span>
            <span> Javascript = Nivel Basico</span>
            <span> Python = Nivel Basico</span>
            <span> HTML = Nivel Basico</span>
            <span> CSS = Nivel Basico</span>
          </div>
        </article>
        <article>
          <img src="/Images/Franco.png" alt="" />
          <h2>Franco Gonzalez</h2>
          <h3>Back End Developer</h3>
          <div className="habilities">
            <h1>Habilidades:</h1>
            <span> Java = Nivel Intermedio</span>
            <span> Javascript = Nivel Basico</span>
            <span> HTML = Nivel Basico</span>
            <span> CSS = Nivel Basico</span>
          </div>
        </article>
        <article>
          <img src="/Images/Jisu.png" alt="" />
          <h2>Pablo Jesus Gambaro</h2>
          <h3>Front End Developer</h3>
          <div className="habilities">
            <h1>Habilidades:</h1>
            <span> Java = Nivel Intermedio</span>
            <span> Javascript = Nivel Alto</span>
            <span> Python = Nivel Basico</span>
            <span> HTML = Nivel Alto</span>
            <span> CSS = Nivel Alto</span>
            <span> SCSS = Nivel Intermedio</span>
          </div>
        </article>
        
        <article>
          <img src="/Images/Jordi.png" alt="" />
          <h2>Franco Gonzalez</h2>
          <h3>Front End Developer</h3>
          <div className="habilities">
            <h1>Habilidades:</h1>
            <span> Java = Nivel Intermedio</span>
            <span> Javascript = Nivel Intermedio</span>
            <span> Python = Nivel Basico</span>
            <span> HTML = Nivel Intermedio</span>
            <span> CSS = Nivel Intermedio</span>
            <span> SCSS = Nivel Basico</span>
          </div>
        </article>
      </div>
    </div>
  );
};

export default AboutUs;
