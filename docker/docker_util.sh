#!/bin/bash

function update_version() {
  local update_level="$1"

  # Increment the specified version part
  case $update_level in
    major)
      NEW_MAJOR_VERSION=$((MAJOR_VERSION + 1))
      NEW_VERSION="$NEW_MAJOR_VERSION.0.0"
      ;;
    minor)
      NEW_MINOR_VERSION=$((MINOR_VERSION + 1))
      NEW_VERSION="$MAJOR_VERSION.$NEW_MINOR_VERSION.0"
      ;;
    patch)
      NEW_PATCH_VERSION=$((PATCH_VERSION + 1))
      NEW_VERSION="$MAJOR_VERSION.$MINOR_VERSION.$NEW_PATCH_VERSION"
      ;;
    *)
      echo "Invalid update level: $update_level. Must be 'major', 'minor', or 'patch'."
      exit 1
      ;;
  esac

  # Update the version in the version file
  echo "$NEW_VERSION" > "$VERSION_FILE"
}

function build_image() {
  # Build the Docker image
  docker build --platform linux/amd64 -t $DOCKER_HUB_USERNAME/$IMAGE_NAME_WITH_SUFFIX:$NEW_VERSION -f $DOCKERFILE_NAME .
}

function push_image() {
  # Push the new version to Docker Hub
  docker push $DOCKER_HUB_USERNAME/$IMAGE_NAME_WITH_SUFFIX:$NEW_VERSION

  # Tag the new version as "latest"
  docker tag $DOCKER_HUB_USERNAME/$IMAGE_NAME_WITH_SUFFIX:$NEW_VERSION $DOCKER_HUB_USERNAME/$IMAGE_NAME_WITH_SUFFIX:latest

  # Push the "latest" tag to Docker Hub
  docker push $DOCKER_HUB_USERNAME/$IMAGE_NAME_WITH_SUFFIX:latest
}


function initialize_variables() {
  IMAGE_NAME="$1"
  VERSION_FILE="$IMAGE_NAME"_version.txt
  DOCKERFILE_NAME="$IMAGE_NAME".dockerfile
  IMAGE_NAME_WITH_SUFFIX="$IMAGE_NAME"_runner

  if [ ! -f "$VERSION_FILE" ]; then
    echo "0.0.0" > "$VERSION_FILE"
  fi

  CURRENT_VERSION=$(cat "$VERSION_FILE")
  IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION"
  MAJOR_VERSION="${VERSION_PARTS[0]}"
  MINOR_VERSION="${VERSION_PARTS[1]}"
  PATCH_VERSION="${VERSION_PARTS[2]}"
}

if [ $# -lt 2 ]; then
  echo "Usage: $0 [command] [parameters]"
  echo "Commands:"
  echo "  update image_name {major|minor|patch}"
  echo "  build image_name"
  echo "  push image_name"
  echo "  release image_name {major|minor|patch}"
  exit 1
fi

COMMAND="$1"
shift
DOCKER_HUB_USERNAME="artem0tranduil"

case $COMMAND in
  update)
    initialize_variables "$1"
    UPDATE_LEVEL="$2"
    update_version "$UPDATE_LEVEL"
    ;;

  build)
    initialize_variables "$1"
    NEW_VERSION=$(cat "$VERSION_FILE")
    build_image
    ;;

  push)
    initialize_variables "$1"
    NEW_VERSION=$(cat "$VERSION_FILE")
    push_image
    ;;

  release)
    initialize_variables "$1"
    UPDATE_LEVEL="$2"
    update_version "$UPDATE_LEVEL"
    build_image
    push_image
    ;;

  *)
    echo "Invalid command: $COMMAND. Must be 'update', 'build', 'push', or 'release'."
    exit 1
    ;;
esac

echo "Command executed successfully: $COMMAND"