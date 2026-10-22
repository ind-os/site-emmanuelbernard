# site-emmanuelbernard

Le site personnel d'Emmanuel Bernard, `https://emmanuelbernard.ch` : une page
statique, Astro 5, React pour le menu mobile, Tailwind 4, servie par nginx. Le
portrait, l'image de partage et les polices viennent de `cdn.avqn.ch`.

## Construire et lancer

Le `Dockerfile` à la racine construit l'image seul, sans argument ni secret.

```bash
docker build -t site-emmanuelbernard .
docker run --rm -p 8080:80 site-emmanuelbernard   # http://localhost:8080
```

- Port écouté : **80**.
- Santé : `GET /healthz` répond `200 {"ok":true,"sha":"…"}`. Le `sha` est
  l'argument de build facultatif `GIT_SHA`, « inconnu » sans lui.
- Aucune variable d'environnement.

Sur le serveur d'AVQNOS, Coolify construit l'image à un commit de ce dépôt
(build pack Dockerfile).

## Travailler dessus

**pnpm**, épinglé par `packageManager`.

```bash
pnpm install
pnpm run dev        # http://localhost:4321
pnpm run build
```
