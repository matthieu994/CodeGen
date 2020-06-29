#!/bin/bash

NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

mkdir /home/ubuntu/ebnscreennetwork/ebnscreennetwork_${DEPLOYMENT_GROUP_NAME}
cd /home/ubuntu/ebnscreennetwork/ebnscreennetwork_${DEPLOYMENT_GROUP_NAME}
aws s3 cp s3://ebnscreennetwork-codedeploy-deployment/env/.env.${DEPLOYMENT_GROUP_NAME} .env
npm install
