# Use Alpine Linux as the base image
FROM alpine:latest

# Update repositories and install required packages
RUN apk update && \
    apk add --no-cache \
        openjdk8 \
        maven \
        nodejs \
        npm \
        python3 \
        py3-pip \
        ruby \
        ruby-bundler \
        dotnet7-sdk \
        dotnet7-runtime \
        aspnetcore7-runtime \
        wget \
        git \
        tar \
        bash \
        ca-certificates \
        zlib-dev \
        icu-libs \
        chromium \
        udev \
        ttf-freefont \
        nss \
        freetype \
        harfbuzz

# Copy the scripts to the Docker image
COPY install_selenium.sh /tmp/
COPY install_chromedriver.sh /tmp/

# Make the scripts executable
RUN chmod +x /tmp/install_selenium.sh && chmod +x /tmp/install_chromedriver.sh

# Run the script to download the latest Selenium Standalone Server and chromedriver
RUN /tmp/install_chromedriver.sh && /tmp/install_selenium.sh

# Set the necessary environment variables
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=true
ENV JAVA_HOME="/usr/lib/jvm/java-1.8-openjdk"
# Set Puppeteer env var to run in alpine
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
# Set Pleywright env var to run in alpine
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_NODEJS_PATH=/usr/bin/node
# Set the SELENIUM_JAR_PATH environment variable in the Dockerfile
ENV SELENIUM_JAR_PATH /usr/share/java/selenium-server.jar


# Test the installed software
RUN java -version && \
    mvn -version && \
    dotnet --version && \
    node -v && \
    npm -v && \
    python3 --version && \
    pip --version && \
    ruby -v && \
    bundle -v

# Set the working directory to the home directory
WORKDIR /home

# Set the entry point
CMD ["/bin/sh"]