# Use the official Nginx image from Docker Hub
FROM nginx:alpine

# Remove the default Nginx static files and config
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy your static website files to the Nginx directory
COPY src/ /usr/share/nginx/html/

# Expose port 80 to allow external traffic
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

