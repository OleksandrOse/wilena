import { useState } from 'react';
import '../styles/Gallery.scss';


const images: string[] = ['/img/1.jpg', '/img/2.jpg', '/img/3.jpg', '/img/4.jpg'];


const Gallery: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);


  return (
    <section className="gallery">
      <div className="gallery__grid">
        {images.map((src) => (
          <img key={src} src={src} onClick={() => setActive(src)} />
        ))}
      </div>


      {active && (
        <div className="gallery__lightbox" onClick={() => setActive(null)}>
          <img src={active} />
        </div>
      )}
    </section>
  );
};

export default Gallery;
