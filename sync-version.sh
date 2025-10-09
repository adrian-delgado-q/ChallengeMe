#!/bin/bash

set -e

if ! command -v jq &> /dev/null; then
  echo "Error: jq is not installed. Please install it to continue."
  echo "On macOS: brew install jq"
  echo "On Debian/Ubuntu: sudo apt-get install jq"
  exit 1
fi

BUMP_TYPE="patch"
for arg in "$@"; do
  case $arg in
    --major)
      BUMP_TYPE="major"
      shift
      ;;
    --minor)
      BUMP_TYPE="minor"
      shift
      ;;
  esac
done

VERSION_FILE="version.json"

if [ ! -f "$VERSION_FILE" ]; then
  echo "Error: version.json not found in the current directory."
  exit 1
fi

CURRENT_VERSION=$(jq -r '.version' "$VERSION_FILE")

IFS='.' read -r major minor patch <<< "$CURRENT_VERSION"

case $BUMP_TYPE in
  major)
    major=$((major + 1))
    minor=0
    patch=0
    ;;
  minor)
    minor=$((minor + 1))
    patch=0
    ;;
  *)
    patch=$((patch + 1))
    ;;
esac

NEW_VERSION="$major.$minor.$patch"
echo "Bumping $BUMP_TYPE version: $CURRENT_VERSION -> $NEW_VERSION"

jq --arg new_ver "$NEW_VERSION" '.version = $new_ver' "$VERSION_FILE" > "${VERSION_FILE}.tmp" && mv "${VERSION_FILE}.tmp" "$VERSION_FILE"
echo "Updated $VERSION_FILE successfully."

echo
echo "Searching for package.json files to sync..."

find . -type d \( -name "node_modules" -o -name ".git" -o -name "dist" -o -name "build" \) -prune -o -name "package.json" -print | while read -r pkg_file; do
  if [ -f "$pkg_file" ]; then
    echo "  -> Synced $pkg_file"
    jq --arg new_ver "$NEW_VERSION" '.version = $new_ver' "$pkg_file" > "${pkg_file}.tmp" && mv "${pkg_file}.tmp" "$pkg_file"
  fi
done

# Update only the VITE_APP_VERSION line in .env/.env
if grep -q '^VITE_APP_VERSION=' .env/.env; then
  sed -i "s/^VITE_APP_VERSION=.*/VITE_APP_VERSION=$NEW_VERSION/" .env/.env
else
  echo "VITE_APP_VERSION=$NEW_VERSION" >> .env/.env
fi
echo "Updated .env/.env successfully."

echo
echo "✅ Version synchronization complete!"