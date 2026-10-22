# Le site d'Emmanuel Bernard : `docker build .` depuis la racine du dépôt. Astro construit une
# fois, nginx sert le résultat sur le port 80.
FROM node:22.23.4-alpine3.24@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914 AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build
# Sha du commit construit, cuit dans /healthz ; sans GIT_SHA, « inconnu ».
ARG GIT_SHA=inconnu
RUN printf '{"ok":true,"sha":"%s"}' "$GIT_SHA" > /app/dist/healthz.json

FROM nginx:1.31.8-alpine3.24@sha256:1ef7ca94d7879df82421428ce13bd1eaa412404953859cf7a5b6512c25e67a60 AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
