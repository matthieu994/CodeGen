
#!/bin/bash
# Install node.js and Forever.js
sudo apt-get update
sudo apt install awscli -y
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install node
npm install pm2 -g
sudo rm -rf /home/ubuntu/ebnscreennetwork/ebnscreennetwork_${DEPLOYMENT_GROUP_NAME}