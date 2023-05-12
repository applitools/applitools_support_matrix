# Use the latest Debian image as the base
FROM debian:latest

# Set environment variables for non-interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# Update the system and install required dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    lsb-release \
    software-properties-common \
    wget \
    nano \
    unzip \
    jq

# Add Microsoft package signing key and repository for .NET
RUN wget https://packages.microsoft.com/config/debian/11/packages-microsoft-prod.deb -O packages-microsoft-prod.deb && \
    dpkg -i packages-microsoft-prod.deb && \
    apt-get update

# Install Java 8, .NET 7, Python latest, Ruby latest, Node.js 18, and Chromium
RUN apt-get install -y --no-install-recommends \
    openjdk-11-jdk \
    maven \
    dotnet-sdk-7.0 \
    python3 \
    python3-pip \
    ruby \
    ruby-dev && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs


RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | \
    tee -a /etc/apt/sources.list.d/google.list && \
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | \
    apt-key add - && \
    apt-get update && \
    apt-get install -y google-chrome-stable libxss1

# Clean up
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* packages-microsoft-prod.deb

# Copy the scripts to the Docker image
COPY install_selenium.sh /tmp/
COPY install_chromedriver.sh /tmp/

# Make the scripts executable
RUN chmod +x /tmp/install_selenium.sh
RUN chmod +x /tmp/install_chromedriver.sh

# Run the script to download the latest Selenium Standalone Server
RUN  /tmp/install_selenium.sh
RUN  /tmp/install_chromedriver.sh
# Check installed chromedriver
RUN chromedriver --version

COPY chrome-flaged /usr/local/bin
RUN chmod +x /usr/local/bin/chrome-flaged

ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/
ENV SELENIUM_JAR_PATH=/usr/share/java/selenium-server.jar
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_NODEJS_PATH=/usr/bin/node
ENV PUPPETEER_EXECUTABLE_PATH="/usr/local/bin/chrome-flaged"


# Set the default command
CMD ["/bin/bash"]