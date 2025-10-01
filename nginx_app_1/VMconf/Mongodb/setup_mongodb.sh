#!/bin/bash

# MongoDB setup script for Ubuntu Server

# Exit if any command fails
set -e

# 1. Update & upgrade
echo "Updating and upgrading system..."
sudo apt update -y
sudo apt upgrade -y

# 2. Install required packages
echo "Installing dependencies..."
sudo apt install -y gnupg curl

# 3. Import MongoDB public GPG key
echo "Adding MongoDB GPG key..."
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# 4. Add MongoDB repository
echo "Adding MongoDB repository..."
echo "deb [signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 5. Update packages again
sudo apt update -y

# 6. Install MongoDB
echo "Installing MongoDB..."
sudo apt install -y mongodb-org

# 7. Start MongoDB and enable it to run on boot
echo "Starting MongoDB..."
sudo systemctl start mongod
sudo systemctl enable mongod

# 8. Check status
sudo systemctl status mongod

echo "MongoDB setup completed!"
