set -e
echo "Enter message: "
read MESSAGE

echo "Deploying $MESSAGE ..."

# build
npm run build

# commit
cd dist
git init
git add -A
git commit -m "$MESSAGE"
git push -f https://github.com/lianruhe/react-redux-webpack.git master:gh-pages

# back to root
cd ..
