## Safe clone of external repos into the learning path

# 🧹 Start fresh: remove old local copy and clone your clean repo
rm -rf nodejs-learning/
git clone git@github.com:maolenin/node.js-learning.git
cd node.js-learning/

# 🔗 Add the external IBM repo as a subtree inside your project (squashed = single clean commit)
git subtree add --prefix 01_lkpho-Cloud-applications-with-Node.js-and-React \
  https://github.com/ibm-developer-skills-network/lkpho-Cloud-applications-with-Node.js-and-React.git \
  main --squash

# 🧽 Remove any node_modules folders (safely cleans project)
git filter-repo --path-glob '*/node_modules/*' --invert-paths

# 🧰 Optimize repository after cleaning
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 🧱 Add .gitignore to prevent node_modules from ever being committed again
echo "node_modules/" >> .gitignore
git add .gitignore
git commit -m "Add .gitignore to exclude node_modules"

# 🔗 (If not already set) Add your remote repository
git remote add origin git@github.com:maolenin/node.js-learning.git

# 🚀 Push everything to GitHub
git push -u origin main --force

