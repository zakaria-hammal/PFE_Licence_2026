#!/bin/bash

# GET Backend setup script for Ubuntu Server

# Exit if any command fails
set -e

# 1. Update & upgrade
echo "Updating and upgrading system..."
sudo apt update -y
sudo apt upgrade -y

# 2. Install required packages
echo "Installing dependencies..."
sudo apt install -y git curl build-essential

# 3. Install Node.js & npm (Node 22 LTS example)
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Clone repository
echo "Cloning repository..."
# Replace <your-github-backend-url> with the actual repo URL
git clone https://github.com/zakaria-hammal/PFE_Licence_2026

# 5. Delete frontend and post_server (keep GET backend only)
cd PFE_Licence_2026/nginx_app_1
echo "Deleting front_end and post_server folders..."
sudo rm -rf front_end
sudo rm -rf back_end/post_server
sudo rm -rf configuration

# 6. Navigate to GET backend folder
cd back_end/get_server

# 7. Install npm dependencies
echo "Installing npm packages..."
npm install
npm install express mongoose cors

