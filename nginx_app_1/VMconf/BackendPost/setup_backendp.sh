#!/bin/bash

# POST Backend setup script for Ubuntu Server

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

# 4. Clone backend repo
echo "Cloning POST backend repository..."
git clone https://github.com/zakaria-hammal/PFE_Licence_2026

# 5. Remove unwanted directories
cd PFE_Licence_2026/nginx_app_1
sudo rm -rf front_end
sudo rm -rf configuration
sudo rm -rf back_end/get_server

# 6. Install npm dependencies including express, mongoose, and cors
echo "Installing npm packages..."
cd back_end/post_server
npm install
npm install express mongoose cors
