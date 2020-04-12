#!/usr/bin/env sh

set -e
set -x

if [ $# -eq 0 ]; then
	current_directory=$(dirname "$0")
else
	current_directory="$1"
fi

cd $current_directory

export BASE_IMAGE="$(jq -r '.docker_image_tag' < "./build_details.json")"
docker build --build-arg BASE_IMAGE=$BASE_IMAGE --build-arg TOKEN=$TOKEN --build-arg PROJECT_ID=$PROJECT_ID  -f ./Dockerfile.firebase .

