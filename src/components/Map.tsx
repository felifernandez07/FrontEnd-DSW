import React from 'react';


const Map: React.FC = () => {

  return (
    <div className="map-container" style={{ width: '100%', height: '400px' }}>
   
   <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.0253483852375!2d-60.596617723411036!3d-33.9147471732093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b84bbd2d2f6dbd%3A0x9a04e49aff851b82!2sCAFE%20DON%20JULIO!5e0!3m2!1ses!2sar!4v1731081213857!5m2!1ses!2sar"
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    
    </div>
  );
};

export default Map;