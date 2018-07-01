FROM node:8.11.3

# setting up MatchAnalyzer

# set work directory on Docker
WORKDIR /projects/matchanalyzer

# Copy project from Host to Docker
COPY ./ ./

# Install server dependencies
RUN cd server && npm install

# Install client dependencies and build it
RUN cd client && npm install && npm run build

# Run server
WORKDIR /projects/matchanalyzer/server

EXPOSE 9000
CMD [ "npm", "start" ]
