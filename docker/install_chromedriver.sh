#!/bin/sh

# Check the Chromium binary location
if [ -f "/usr/bin/chromium-browser" ]; then
  CHROMIUM_BIN="/usr/bin/chromium-browser"
elif [ -f "/usr/bin/chromium" ]; then
  CHROMIUM_BIN="/usr/bin/chromium"
else
  echo "Chromium browser not found in the expected locations."
  exit 1
fi

# Get the Chromium version
CHROMIUM_VERSION=$($CHROMIUM_BIN --version | awk '{ print $2 }')

# Get the major version
CHROMIUM_MAJOR_VERSION=$(echo $CHROMIUM_VERSION | cut -d'.' -f1)

# Get the corresponding ChromeDriver version
CHROMEDRIVER_VERSION=$(wget -q -O - "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$CHROMIUM_MAJOR_VERSION")

# Download the ChromeDriver
wget -q -O chromedriver.zip "https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip"

# Unzip and install the ChromeDriver
unzip -o chromedriver.zip
rm chromedriver.zip
sudo mv chromedriver /usr/bin/chromedriver
sudo chmod +x /usr/bin/chromedriver

echo "Installed ChromeDriver version: $CHROMEDRIVER_VERSION"
