# Portafolio Profesional - Marcos Vinicio Reyes Muñoz

Este es el repositorio de tu portafolio profesional, optimizado para ser desplegado en **GitHub Pages**. Está diseñado con un enfoque moderno, sobrio y responsivo (adaptado para móviles), estructurado para destacar habilidades en **Product Ownership**, **Project Management**, **IT Business Partnering**, **IA** y **Blockchain**.

---

## 📁 Estructura del Proyecto

El sitio es completamente estático y no tiene dependencias complejas (sin bases de datos ni backend). Las secciones dinámicas se alimentan de archivos JSON.

```
portfolio-marcos/
├── index.html            # Estructura principal, SEO y etiquetas Open Graph.
├── README.md             # Esta guía de uso y mantenimiento.
├── css/
│   └── style.css         # Estilos (Glassmorphism, Dark Tech, Responsive).
├── js/
│   └── app.js            # Carga de datos dinámicos y lógica de filtros.
├── data/
│   ├── projects.json     # Datos de proyectos.
│   └── articles.json     # Datos de artículos.
├── cv/
│   ├── README.md         # Instrucciones sobre tu Currículum.
│   └── (Tu CV aquí)      # Tu archivo de CV en formato PDF.
└── assets/
    └── img/              # Imágenes y favicons.
```

---

## 🛠️ Cómo Actualizar el Contenido

No necesitas modificar el archivo HTML para agregar nuevos proyectos, artículos o cambiar tu CV. Todo se maneja a través de los archivos en la carpeta `data/` y `cv/`.

### 1. Agregar o Editar Proyectos (`data/projects.json`)

Cada tarjeta de proyecto en el portafolio se genera a partir de este archivo.
Abre `data/projects.json` y añade un nuevo bloque con la siguiente estructura:

```json
  {
    "id": "identificador-unico",
    "title": "Nombre de tu Proyecto",
    "category": "Categorías / Subtítulos",
    "tag": "ia | fintech | blockchain | salud",  // Importante: determina el filtro interactivo
    "description": "Una breve descripción de lo que trata el proyecto y su impacto.",
    "role": "Tu rol en el proyecto (ej: Product Owner, Levantamiento, UX).",
    "technologies": ["Tecnología 1", "Herramienta 2", "Concepto 3"],
    "status": "Caso Privado | En Desarrollo | Web Activa | Prototipo",
    "link": "https://enlace-del-proyecto.com", // Déjalo vacío "" si no tiene enlace
    "linkLabel": "Texto del botón (ej: Ver Web, Leer Artículo, Próximamente)"
  }
```

*Nota:* Si dejas el campo `"link": ""` vacío, el botón se mostrará deshabilitado de manera elegante y con el texto que especifiques en `"linkLabel"`.

### 2. Agregar o Editar Artículos (`data/articles.json`)

De manera similar a los proyectos, los artículos se manejan en `data/articles.json`. Añade un nuevo bloque para cada publicación:

```json
  {
    "id": "identificador-articulo",
    "title": "Título del Artículo",
    "summary": "Resumen breve o gancho sobre lo que trata el artículo técnico o de opinión.",
    "tags": ["IA", "Automatización", "Metodologías"],
    "link": "https://enlace-a-tu-articulo.com", // Enlace directo a Medium, LinkedIn, o local
    "linkLabel": "Leer Artículo",
    "status": "Publicado | Borrador"
  }
```

*Nota:* Si tienes guías estáticas locales (como tu guía de Hermes), puedes enlazarla de manera relativa si está en el mismo host, por ejemplo: `"link": "../hermes-agent-vps-guide/index.html"`.

### 3. Actualizar tu Currículum Vitae (CV)

1. Exporta tu CV a formato PDF.
2. Nómbralo exactamente como **`CV_Marcos_Vinicio_Reyes.pdf`**.
3. Reemplaza el archivo dentro de la carpeta `cv/`.
4. El portafolio actualizará automáticamente el enlace de descarga.

---

## 🚀 Cómo Desplegar en GitHub Pages

Para publicar tu portafolio en internet y tener tu dirección `https://<tu-usuario>.github.io`:

1. **Crea un repositorio en GitHub**:
   - Nómbralo `<tu-usuario>.github.io` (por ejemplo: `marcosreyes.github.io` si tu usuario es `marcosreyes`).
2. **Sube el código**:
   - Inicializa git, añade tu repositorio remoto y sube los archivos:
     ```bash
     git init
     git add .
     git commit -m "Initial commit - Portfolio Marcos"
     git branch -M main
     git remote add origin https://github.com/<tu-usuario>/<tu-usuario>.github.io.git
     git push -u origin main
     ```
3. **Activa GitHub Pages**:
   - Ve a la pestaña **Settings** de tu repositorio en GitHub.
   - En el menú lateral izquierdo, haz clic en **Pages**.
   - En la sección **Build and deployment**, bajo **Source**, asegúrate de que esté seleccionado `Deploy from a branch`.
   - Bajo **Branch**, selecciona `main` (o la rama que uses) y la carpeta `/ (root)`.
   - Haz clic en **Save**.
   - En pocos minutos, tu sitio estará en línea.

---

## 📱 Tecnologías Usadas

- **HTML5** & **CSS3** (Diseño responsivo, Grid, Flexbox y Glassmorphism).
- **JavaScript (Vanilla)** (Carga asíncrona mediante API Fetch y filtros de selección).
- **Google Fonts** (Fuentes *Outfit* e *Inter*).
- Iconos vectoriales integrados mediante **inline SVG** para máxima velocidad de carga.
