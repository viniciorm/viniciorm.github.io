document.addEventListener('DOMContentLoaded', () => {
  // Initialize dynamic elements
  initMobileMenu();
  loadProjects();
  loadArticles();
  initScrollSpy();
  updateFooterYear();
});

/* ==========================================================================
   Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   Fetch & Load Projects
   ========================================================================== */
async function loadProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error('Error al cargar la base de datos de proyectos');
    const projects = await response.json();
    
    renderProjects(projects);
    initProjectFilters(projects);
  } catch (error) {
    console.error('Error:', error);
    projectsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
        <p>No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde.</p>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">${error.message}</p>
      </div>
    `;
  }
}

function renderProjects(projectsList) {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  projectsGrid.innerHTML = '';

  projectsList.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card glass-card';
    card.setAttribute('data-category', project.tag);

    // Build Tech Tags HTML
    const techTagsHTML = project.technologies
      .map(tech => `<span class="project-tech-tag">${tech}</span>`)
      .join('');

    // Determine Action Button
    let actionBtnHTML = '';
    if (project.link) {
      const isPrimary = project.status === 'Web Activa' || project.linkLabel === 'Ver Web' || project.linkLabel === 'Ver Demo';
      const btnClass = isPrimary ? 'btn-primary' : 'btn-secondary';
      actionBtnHTML = `
        <a href="${project.link}" target="_blank" class="btn ${btnClass} btn-sm">
          ${project.linkLabel}
          <svg style="width: 14px; height: 14px; fill: currentColor; margin-left: 4px;" viewBox="0 0 24 24">
            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
          </svg>
        </a>
      `;
    } else {
      actionBtnHTML = `
        <button class="btn btn-secondary btn-sm btn-disabled" disabled>
          ${project.linkLabel}
        </button>
      `;
    }

    card.innerHTML = `
      <span class="project-category">${project.category}</span>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="project-meta">
        <div class="project-role"><strong>Rol:</strong> ${project.role}</div>
        <div class="project-tech">
          ${techTagsHTML}
        </div>
      </div>
      <div class="project-action">
        ${actionBtnHTML}
      </div>
    `;

    projectsGrid.appendChild(card);
  });
}

function initProjectFilters(projects) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      if (filterValue === 'all') {
        renderProjects(projects);
      } else {
        const filteredProjects = projects.filter(p => p.tag === filterValue);
        renderProjects(filteredProjects);
      }
    });
  });
}

/* ==========================================================================
   Fetch & Load Articles
   ========================================================================== */
async function loadArticles() {
  const articlesGrid = document.getElementById('articles-grid');
  if (!articlesGrid) return;

  try {
    const response = await fetch('data/articles.json');
    if (!response.ok) throw new Error('Error al cargar la base de datos de artículos');
    const articles = await response.json();
    
    renderArticles(articles);
  } catch (error) {
    console.error('Error:', error);
    articlesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
        <p>No se pudieron cargar los artículos. Inténtalo de nuevo más tarde.</p>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">${error.message}</p>
      </div>
    `;
  }
}

function renderArticles(articlesList) {
  const articlesGrid = document.getElementById('articles-grid');
  if (!articlesGrid) return;

  articlesGrid.innerHTML = '';

  articlesList.forEach(article => {
    const card = document.createElement('div');
    card.className = 'article-card glass-card';

    // Build Tags HTML
    const tagsHTML = article.tags
      .map(tag => `<span class="article-tag">${tag}</span>`)
      .join('');

    // Determine Action Button
    let actionBtnHTML = '';
    if (article.link) {
      actionBtnHTML = `
        <a href="${article.link}" target="_blank" class="btn btn-outline btn-sm">
          ${article.linkLabel}
          <svg style="width: 14px; height: 14px; fill: currentColor; margin-left: 4px;" viewBox="0 0 24 24">
            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
          </svg>
        </a>
      `;
    } else {
      actionBtnHTML = `
        <button class="btn btn-secondary btn-sm btn-disabled" disabled>
          ${article.linkLabel}
        </button>
      `;
    }

    card.innerHTML = `
      <h3 class="article-title">${article.title}</h3>
      <p class="article-summary">${article.summary}</p>
      <div class="article-tags">
        ${tagsHTML}
      </div>
      <div class="article-action">
        ${actionBtnHTML}
      </div>
    `;

    articlesGrid.appendChild(card);
  });
}

/* ==========================================================================
   Scroll Spy & Navigation Highlighting
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // Offset for sticky nav

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   Helper Functions
   ========================================================================== */
function updateFooterYear() {
  const yearElement = document.getElementById('footer-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
