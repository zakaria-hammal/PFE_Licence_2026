#!/bin/bash

# Frontend setup script for Ubuntu Server

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

# 4. Clone frontend repo
echo "Cloning frontend repository..."
# Replace <your-github-frontend-url> with the actual repo URL
git clone https://github.com/zakaria-hammal/PFE_Licence_2026

#5. Deleting the backend
cd PFE_Licence_2026/nginx_app_1
sudo rm -rf back_end
sudo rm -rf configuration


# 5. Install npm dependencies
echo "Installing npm packages..."
cd front_end
npm install

# 6. Start the app with host binding for VM access
echo "Starting frontend..."
npm run dev -- --host

