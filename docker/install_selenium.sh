#!/bin/bash

# Set user agent for wget
USER_AGENT="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36"

# Get the latest Selenium release information from GitHub API
LATEST_RELEASE=$(wget -q -O - --header="User-Agent: $USER_AGENT" https://api.github.com/repos/SeleniumHQ/selenium/releases/latest)

# Extract the download URL for the Selenium Standalone Server jar file
DOWNLOAD_URL=$(echo "$LATEST_RELEASE" | jq -r '[.assets[] | select(.name | test("selenium-server-.*\\.jar"))] | last | .browser_download_url')

echo $DOWNLOAD_URL
# Download the latest version of Selenium Standalone Server
echo "Downloading the latest Selenium Standalone Server..."
wget -q -O selenium-server.jar --header="User-Agent: $USER_AGENT" "$DOWNLOAD_URL"
echo "Download completed."

# Move the downloaded jar file to /usr/share/java
TARGET_DIR="/usr/share/java"
mv "selenium-server.jar" "$TARGET_DIR/selenium-server.jar"
echo "The latest version of Selenium Standalone Server has been downloaded and moved to: $TARGET_DIR/selenium-server.jar"
