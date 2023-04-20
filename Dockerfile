FROM node:19 as base
WORKDIR /app
COPY package.json .


ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install ; \
    Else npm install --only=production ; \
    fi

# 
# FROM base as development
# WORKDIR /app
# COPY package.json .
# RUN npm install 
COPY . .
ENV PORT=4000
EXPOSE $PORT
CMD ["npm","run", "start-dev"]

# # 
# FROM base as production
# WORKDIR /app
# COPY package.json .
# RUN npm install --only=production
# COPY . .
# EXPOSE 4000
# CMD ["npm","run", "start"]
