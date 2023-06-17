#!/bin/bash

# Array of directories containing microservices
directories=(
    "./appointment-ms"
    "./complaint-ms"
    "./gatway-ms"
    "./userManagament-ms"
    "./forum-ms"
    # Add more directories as needed
)

    echo "==========================="
    echo "Stoping microservices with docker-compose.yml"
    for dir in "${directories[@]}"
    do
        echo "Stoping microservices in directory: $dir"
        cd "$dir"
        pwd
        docker-compose down
            echo "==========================="
            echo "Docker-compose exited with status $?" 
            echo "🛑 Docker-compose exited with status $?" 
        cd ..
    done


echo "==========================="