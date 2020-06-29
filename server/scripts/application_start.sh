
#!/bin/bash
# Stop all servers and start the server
NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd  /home/ubuntu/ebnscreennetwork/ebnscreennetwork_${DEPLOYMENT_GROUP_NAME}/
pm2 stop ecosystem.config.js
pm2 start ecosystem.config.js
