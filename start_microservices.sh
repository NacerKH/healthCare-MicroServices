#!/bin/bash

# Array of directories containing docker-compose.yml files
directories=(
    "./appointment-ms"
    "./complaint-ms"
    "./gatway-ms"
    "./userManagament-ms"
    "./forum-ms"
    # Add more directories as needed
)

echo "==========================="
echo "🚀 Starting microservices 🚀"

echo "Do you want to create a new network? (This is useful if it's your first time running the microservices) 🌐 [Y/n]"

read -r network_reply
if [[ $network_reply =~ ^[Yy]$ ]]; then
    echo "==========================="
    echo "Creating a new network... ⚡️"
    docker network create medest-network
    echo "New network 'mynetwork' created successfully! 🎉"
fi



    echo "==========================="
    echo "Starting microservices with docker-compose.yml... 🚀"
    for dir in "${directories[@]}"; do
        echo "📂 Starting microservices in directory: $dir"
        cd "$dir" || exit
        pwd
        docker-compose up -d --build --remove-orphans
        docker-compose logs -f &
        echo "==========================="
        echo "🛑 Docker-compose exited with status $?" 
        cd ..
    done


echo "==========================="
echo "Microservices deployment completed! 🎉"
