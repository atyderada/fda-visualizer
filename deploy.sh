#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 're-deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:atyderada/fda-visualizater.git master:gh-pages
# git push git@github.com:atyderada/megabrokerslatam-frontend.git master:gh-pages

cd -