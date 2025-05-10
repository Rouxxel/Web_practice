# Web_practice

A personal practice project to explore and apply the core features of **HTML5**, **CSS3**, and **JavaScript**, bundled with a **Dockerized deployment** setup using Nginx.

This static website demonstrates a wide range of front-end concepts, including custom fonts, media elements, interactivity via JavaScript, and multi-page navigation.

---

## 🧱 Project Structure

```
Web_practice/
├── index.html             # Main landing page
├── README.md              # Project documentation
├── Dockerfile             # Docker setup for deployment
├── .dockerignore          # Files ignored during Docker image build
├── .gitignore             # Git exclusions
│
├── audio_srcs/            # Audio files used in the site
├── css/                   # CSS stylesheets
├── fonts/                 # Custom font files
├── imgs/                  # Images and icons
├── jscripts/              # JavaScript files
├── pages/                 # Additional HTML pages
└── videos/                # Embedded video content
```

---

## 🚀 Technologies Used

- **HTML5** – Semantic markup, forms, multimedia, structure
- **CSS3** – Layouts, animations, responsive design, custom fonts
- **JavaScript (vanilla)** – DOM manipulation, interactivity
- **Docker** – Containerized deployment using Nginx
- **Nginx** – Lightweight web server for static content

---

## 🐳 Run the Project with Docker

Make sure [Docker](https://www.docker.com/products/docker-desktop) is installed and running.

### 1. Build the Docker Image

```bash
docker build -t web_practice .
```

### 2. Run the Container

```bash
docker run -d -p 8080:80 web_practice
```

Then open your browser and go to:

```
http://localhost:8080
```

---

## 💡 Purpose

This project serves as a hands-on sandbox to:

- Practice and experiment with front-end web technologies
- Understand file organization for real-world projects
- Learn basic Docker workflows for static site deployment

---

## 📦 Notes

- This is a self-contained static site — no backend.
- Deployment is handled via a lightweight Nginx Docker container.
- Future enhancements may include SCSS, JS modules, or integration with a CI/CD pipeline.

---

## 📄 License

This project is for educational and personal practice use. No license is currently attached.
