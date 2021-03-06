FROM node:12

WORKDIR /app

#RUN apt update 

RUN export DEBIAN_FRONTEND=noninteractive && apt update && apt install -y --no-install-recommends libgl1 && rm -rf /var/lib/apt/lists/*

#COPY package.json .
COPY . .

# make dir for uploads image and temp files
#RUN mkdir uploads
#RUN mkdir temp

RUN npm install

#RUN npm install pm2 -g

#COPY . .

RUN npm run build

#RUN ls

#CMD ["pm2-runtime", "dist/server/index.js"]
#CMD [ "npm", "run", "pm2:serve" ]
CMD [ "npm", "run", "pm2:runtime:serve" ]

#CMD [ "npm", "run", "serve" ]
