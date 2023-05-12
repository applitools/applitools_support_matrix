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
    ruby-dev \
    chromium && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

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
RUN  /tmp/install_chromedriver.sh \

ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/
ENV SELENIUM_JAR_PATH /usr/share/java/selenium-server.jar

# Set the default command
CMD ["/bin/bash"]