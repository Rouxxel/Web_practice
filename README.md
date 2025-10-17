# Web_practice

A personal practice project to explore and apply the core features of **HTML5**, **CSS3**, and **JavaScript**, bundled with a **Dockerized deployment** setup using Nginx.

This static website demonstrates a wide range of front-end concepts, including custom fonts, media elements, interactivity via JavaScript, and multi-page navigation.

---

## 🧱 Project Structure

```
Web_practice/
├── src/                   # Source files (production-ready)
│   ├── index.html         # Main landing page
│   ├── pages/             # Additional HTML pages
│   │   ├── about-us.html
│   │   ├── contact-us.html
│   │   └── credits.html
│   └── assets/            # Static assets
│       ├── css/           # CSS stylesheets
│       ├── js/            # JavaScript files
│       ├── images/        # Images and icons
│       ├── fonts/         # Custom font files
│       ├── audio/         # Audio files
│       └── videos/        # Video content
├── README.md              # Project documentation
├── Dockerfile             # Docker setup for deployment
├── docker-compose.yml     # Docker Compose setup
├── .dockerignore          # Files ignored during Docker image build
└── .gitignore             # Git exclusions
```

---

## 🚀 Technologies Used

- **HTML5** – Semantic markup, forms, multimedia, structure
- **CSS3** – Layouts, animations, responsive design, custom fonts
- **JavaScript (vanilla)** – DOM manipulation, interactivity
- **Docker** – Containerized deployment using Nginx
- **Docker Compose** – Simplified multi-container and build setup
- **Nginx** – Lightweight web server for static content

---

## 🐳 Run the Project with Docker

Make sure [Docker](https://www.docker.com/products/docker-desktop) is installed and running.

### Option 1: Using Docker Compose (Recommended)

1. Build and start the container:

```bash
docker-compose up --build -d
```

2. Open your browser and go to:

```
http://localhost:8080
```

3. To stop the container:

```bash
docker-compose down
```

### Option 2: Using Docker CLI Directly

1. Build the Docker image:

```bash
docker build -t web_practice .
```

2. Run the container:

```bash
docker run -d -p 8080:80 web_practice
```

3. Open your browser and visit:

```
http://localhost:8080
```

---

## 💡 Purpose

This project serves as a hands-on sandbox to:

- Practice and experiment with front-end web technologies
- Understand file organization for real-world projects
- Learn basic Docker and Docker Compose workflows for static site deployment

---

## 📦 Notes

- This is a self-contained static site — no backend.
- Deployment is handled via a lightweight Nginx Docker container.
- Future enhancements may include SCSS, JS modules, or integration with a CI/CD pipeline.
