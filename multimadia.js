
// Insertamos el bloque HTML
const embedHTML = `
  <blockquote class="instagram-media" 
      data-instgrm-permalink="https://www.instagram.com/dulzura_mia_reposteria/?utm_source=ig_embed&ig_rid=5876dcaf-a58a-4858-bb4c-29b0c35a481b" 
      data-instgrm-version="14" 
      style="width:100%; max-width:500px; margin:auto;">
  </blockquote>
`;

document.getElementById("video-container").innerHTML = embedHTML;

// Ahora añadimos el script dinámicamente
const script = document.createElement("script");
script.src = "//www.instagram.com/embed.js";
script.async = true;
document.body.appendChild(script);
