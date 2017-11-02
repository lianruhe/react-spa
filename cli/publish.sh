set -e
echo "Enter message: "
read MESSAGE

echo "Deploying $MESSAGE ..."

# clean
npm run clean

# compiler
npm run compile

# commit
cd dist
git init
git add -A
git commit -m "$MESSAGE"
git push -f git@github.com:lianruhe/react-spa.git dev:gh-pages

# back to root
cd ..
