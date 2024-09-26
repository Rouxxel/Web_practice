#Use the official Nginx image from Docker Hub
FROM nginx:alpine

#Remove the default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

#Copy your static website files to the Nginx directory
COPY . /usr/share/nginx/html

#Expose port 80 to allow external traffic
EXPOSE 80

#Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

