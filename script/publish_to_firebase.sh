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

docker build \
    --build-arg BASE_IMAGE=$BASE_IMAGE \
    --build-arg TOKEN=$TOKEN \
    --build-arg PROJECT_ID=$PROJECT_ID \
    --build-arg FIREBASE_API_KEY=$FIREBASE_API_KEY \
    --build-arg FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN \
    --build-arg FIREBASE_DATABASE_URL=$FIREBASE_DATABASE_URL \
    --build-arg FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID \
    --build-arg FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET \
    --build-arg FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID \
    --build-arg FIREBASE_APP_ID=$FIREBASE_APP_ID \
    -f ./Dockerfile.firebase .
