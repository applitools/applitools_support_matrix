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
echo $BROWSER_BIN

# Get the browser version
BROWSER_VERSION=$($BROWSER_BIN  --no-sandbox --version | awk '{ if ($1 == "Chromium") print $2; else if ($1 == "Google") print $3 }')
echo $BROWSER_VERSION

# Get the major version
BROWSER_MAJOR_VERSION=$(echo $BROWSER_VERSION | cut -d'.' -f1)
echo  $BROWSER_MAJOR_VERSION
# Get the corresponding ChromeDriver version
CHROMEDRIVER_VERSION=$(wget -q -O - "https://googlechromelabs.github.io/chrome-for-testing/LATEST_RELEASE_$BROWSER_MAJOR_VERSION")

# Download the ChromeDriver
echo "$CHROMEDRIVER_VERSION"
wget -q -O chromedriver.zip "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/$CHROMEDRIVER_VERSION/linux64/chromedriver-linux64.zip"

# Unzip and install the ChromeDriver
ls -sh chromedriver.zip
unzip -o chromedriver.zip
rm chromedriver.zip
ls -sh chromedriver-linux64
mv chromedriver-linux64/chromedriver /usr/bin/chromedriver
chmod +x /usr/bin/chromedriver
ls -lsh /usr/bin/chromedriver


echo "Installed ChromeDriver version: $CHROMEDRIVER_VERSION"
