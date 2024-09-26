# Web_practice
Just a somewhat simple practice of HTML, CSS and JS

Update
I decided to practice Docker to streamline the deployment process of my static web project, which ]consists of HTML, CSS, and JavaScript files. Therefore, I created a Dockerfile to build a Docker image that uses Nginx as the web server and Alpine Linux as the environment. This setup involves removing the default files in Nginx, copying all my project files into the image directory, and exposing port 80.

Running Nginx in the foreground with the command:
dockerfile:
CMD ["nginx", "-g", "daemon off;"]

Running the image as a container with the command:
bash:
docker run -d -p 8080:80 web-practice-site

Now the container should become accessible at http://localhost:8080 in your browser (this should work on any system that supports Docker, not just Linux).The image is not currently uploaded to Docker Hub or any other platform for Docker images, but you can build the image locally by following the commands above to run it as a container.


