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
    openjdk-17-jdk \
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

RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --yes --dearmor --output /usr/share/keyrings/microsoft.gpg && \
    sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/microsoft-debian-bullseye-prod bullseye main" > /etc/apt/sources.list.d/microsoft.list' && \
    apt update && apt install -y powershell

# Clean up
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* packages-microsoft-prod.deb

RUN gem install bundler
RUN bundle config --global silence_root_warning 1

# Copy and Run Selenium Server script to the Docker image
COPY install_selenium.sh /tmp/
RUN chmod +x /tmp/install_selenium.sh
RUN  /tmp/install_selenium.sh


# Copy and Run Chromedriver script to the Docker image
COPY install_chromedriver.sh /tmp/
RUN chmod +x /tmp/install_chromedriver.sh
RUN  /tmp/install_chromedriver.sh


# Check installed chromedriver
RUN chromedriver --version

COPY chrome-flaged /usr/local/bin
RUN chmod +x /usr/local/bin/chrome-flaged

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64/
ENV SELENIUM_JAR_PATH=/usr/share/java/selenium-server.jar
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_NODEJS_PATH=/usr/bin/node
ENV PUPPETEER_EXECUTABLE_PATH="/usr/local/bin/chrome-flaged"


# Set the default command
CMD ["/bin/bash"]