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

# Set the necessary environment variables
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=true
ENV JAVA_HOME="/usr/lib/jvm/java-1.8-openjdk"
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_NODEJS_PATH=/usr/bin/node


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