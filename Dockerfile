FROM node:22-alpine

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy dependency files first (better caching)
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

RUN pnpm build

EXPOSE 5000

CMD ["pnpm", "start:prod"]