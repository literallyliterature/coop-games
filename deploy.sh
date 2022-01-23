#!/usr/bin/env sh

# based on https://medium.com/swlh/deploy-vue-app-to-github-pages-2ada48d7397e

# abort on errors
set -e
# navigate into the build output directory
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:literallyliterature/coop-games.git master:gh-pages
cd ..