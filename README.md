# site-emmanuelbernard

Le site personnel d'Emmanuel Bernard, `https://emmanuelbernard.ch` : une page
statique, Astro 5, React pour le menu mobile, Tailwind 4, servie par nginx. Le
portrait, l'image de partage et les polices viennent de `cdn.avqn.ch`.

## Construire et lancer

Le `Dockerfile` à la racine construit l'image seul, sans secret.

```bash
docker build --build-arg GIT_SHA="$(git rev-parse HEAD)" -t site-emmanuelbernard .
docker run --rm -p 8080:80 site-emmanuelbernard   # http://localhost:8080
```

- Un seul port exposé : **80**.
- La sonde : `GET /healthz.json` et `GET /healthz` rendent
  `200 {"ok":true,"sha":"<GIT_SHA>"}`, écrit dans `dist/healthz.json` au build ;
  « inconnu » sans l'argument de build `GIT_SHA`.
- Le `HEALTHCHECK` demande `/healthz` par le `wget` de busybox.
- Aucune variable d'environnement.

## La publication

Le site se publie par une poussée sur `main` : GitHub le construit, puis le
serveur d'AVQNOS reprend l'image. `.github/workflows/publier.yml`, à chaque
poussée :

1. construit l'image avec `GIT_SHA` au commit et la pousse sur
   `ghcr.io/ind-os/site-emmanuelbernard`, étiquetée `main` et par le commit ;
2. demande au serveur d'AVQNOS de reprendre l'image `main`, puis attend que
   `<SITE_ADRESSE>/healthz.json` rende ce commit ; rouge après dix minutes.
   Sans les secrets du serveur, le résumé du workflow dit que rien n'est publié,
   et le workflow finit vert.

Ce que le dépôt reçoit du serveur, posé par le kit d'Indos quand il installe le
site :

| Nom | Sorte | Contenu |
| --- | --- | --- |
| `REDEPLOIEMENT_ADRESSE` | secret | l'adresse qui fait reprendre l'image `main` au serveur |
| `REDEPLOIEMENT_JETON` | secret | le jeton de cette adresse |
| `SITE_ADRESSE` | variable | l'adresse du site en ligne |

Le serveur tire l'image sans identifiant, le paquet GHCR étant public.

## Travailler dessus

**pnpm**, épinglé par `packageManager`.

```bash
pnpm install
pnpm run dev        # http://localhost:4321
pnpm run build
```

## Claude Code

- `CLAUDE.md` : les gestes de la personne qui fait évoluer le site, pour Claude
  Code : préparer l'ordinateur, prévisualiser, publier, revenir à une version
  d'avant.
- `.claude/settings.json` : Claude ne modifie ni `.github/` ni `.claude/`, ne
  lance ni `gh secret`, ni `gh api`, ni `gh variable set` ou `delete`, ni les
  gestes de `gh auth` qui rendent ou changent le jeton, et ne force aucune
  poussée.
