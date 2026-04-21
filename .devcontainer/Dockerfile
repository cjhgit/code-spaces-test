FROM mcr.microsoft.com/devcontainers/base:bullseye

# Install Node.js 24.14.0 (fixed version)
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g n \
    && n 24.14.0 \
    && npm install -g @anthropic-ai/claude-code

# Set working directory
WORKDIR /workspaces/code-spaces-test
