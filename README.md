# Software Engineering 2
# Work As A Team 
  1. Youssef Ahmed Ali Amer
  2. Menna Allah Sobhi Daoud
  3. Heba Alsayid Abdel Gawad
  4. Wegdan Jamal Shehata


💻 Design and Development Time
During development, our data provider is a headless CMS, strapi.

Note that it is used only during development and build time, not during production.

By default, strapi listens on port 1337. If you're using WSL2 on Windows and also running Docker Desktop, port 1337 may not be available on your system. To use port 3000 instead, set the environment variable PORT to 3000.

export PORT=3300
Start strapi:

git clone
cd cms
npm i
INITIALIZE_DATA=true npm run develop
  

