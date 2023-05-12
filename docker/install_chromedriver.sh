#!/bin/sh
set -e

# Check the Chromium or Google Chrome binary location
if [ -f "/usr/bin/chromium-browser" ]; then
  BROWSER_BIN="/usr/bin/chromium-browser"
elif [ -f "/usr/bin/chromium" ]; then
  BROWSER_BIN="/usr/bin/chromium"
elif [ -f "/usr/bin/google-chrome" ]; then
  BROWSER_BIN="/usr/bin/google-chrome"
else
  echo "Chromium or Google Chrome browser not found in the expected locations."
  exit 1
fi

# Get the browser version
BROWSER_VERSION=$($BROWSER_BIN  --no-sandbox --version | awk '{ if ($1 == "Chromium") print $2; else if ($1 == "Google") print $3 }')

# Get the major version
BROWSER_MAJOR_VERSION=$(echo $BROWSER_VERSION | cut -d'.' -f1)
# Get the corresponding ChromeDriver version
CHROMEDRIVER_VERSION=$(wget -q -O - "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$BROWSER_MAJOR_VERSION")

# Download the ChromeDriver
echo $CHROMEDRIVER_VERSION
wget -q -O chromedriver.zip "https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip"

# Unzip and install the ChromeDriver
unzip -o chromedriver.zip
rm chromedriver.zip
ls -sh
mv chromedriver /usr/bin/chromedriver
chmod +x /usr/bin/chromedriver

echo "Installed ChromeDriver version: $CHROMEDRIVER_VERSION"
