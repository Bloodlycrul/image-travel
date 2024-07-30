FROM node:18

# Create app directory
WORKDIR /src

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# If you are using a PORT, make sure it matches here and in your Next.js config
EXPOSE 5001

#Generate the prisma client
RUN npx prisma generate



# Start the Next.js application
CMD ["npm", "run", "start"]