#!/bin/bash

# Nginx VM setup script for Ubuntu Server
# Exit if any command fails
set -e

echo "=== Updating system ==="
sudo apt update -y
sudo apt upgrade -y

echo "=== Installing Nginx ==="
sudo apt install -y nginx curl git

echo "=== Starting and enabling Nginx ==="
sudo systemctl enable nginx
sudo systemctl start nginx

echo "=== Cloning repo ==="
git clone https://github.com/zakaria-hammal/PFE_Licence_2026

echo "=== Deleting unnecessary folders ==="
cd PFE_Licence_2026/nginx_app_1
sudo rm -rf front_end back_end

echo "=== Copy Nginx configuration ==="
cd ../configuration


# Create SSL folder and copy keys
sudo mkdir -p /etc/nginx/ssl
sudo cp ~/PFE_Licence_2026/nginx_app_1/configuration/SSL/server.key /etc/nginx/ssl/
sudo openssl x509 -req -days 365 -in ~/PFE_Licence_2026/nginx_app_1/configuration/SSL/server.csr \
  -signkey /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt


# Edit main config:
sudo cp PFE_Licence_2026/nginx_app_1/configuration/ngnix.conf /etc/nginx/nginx.conf

# Optional: remove default site
sudo rm -f /etc/nginx/sites-enabled/default

echo "=== Testing Nginx configuration ==="
sudo nginx -t

echo "=== Restarting Nginx ==="
sudo systemctl restart nginx

echo "=== Nginx setup completed! ==="
