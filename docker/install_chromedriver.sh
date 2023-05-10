#!/bin/bash

CHROMIUM_PATH="/usr/bin/chromium-browser"

if [ ! -f "$CHROMIUM_PATH" ]; then
    echo "Chromium browser not found at $CHROMIUM_PATH."
    exit 1
fi

CHROMIUM_VERSION=$("$CHROMIUM_PATH" --version | sed -n 's/.*Chromium \([0-9]*\).*/\1/p')


CHROMEDRIVER_BASE_URL="https://chromedriver.storage.googleapis.com"
CHROMEDRIVER_VERSION=$(wget -q -O - "$CHROMEDRIVER_BASE_URL/LATEST_RELEASE_$CHROMIUM_VERSION")

echo "Downloading ChromeDriver version $CHROMEDRIVER_VERSION..."
wget -q -O chromedriver_linux64.zip "$CHROMEDRIVER_BASE_URL/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip"
echo "Download completed."

echo "Extracting ChromeDriver binary..."
unzip -o -q chromedriver_linux64.zip
rm chromedriver_linux64.zip
echo "Extraction completed."

echo "Moving ChromeDriver to /usr/bin..."
mv chromedriver /usr/bin/chromedriver
chmod +x /usr/bin/chromedriver
echo "The matching version of ChromeDriver has been downloaded and installed at: /usr/bin/chromedriver"
