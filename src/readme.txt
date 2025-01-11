DONE 1) springboot replace db.json to h2
DONE 1.5) Merge backend with fronted   
     1.6) docker compose for new backend
     2) add MSAL for editor page Azure ConectID
     3) add Azure KeyVault for keeping secretes (for google.password)
     4) kuebernetes




docker build -f ./Dockerfile.angular -t angular-app ../../ajurweda
docker build -f ./Dockerfile.json-server -t json-server ../../ajurweda

MSAL Angular example
 
1) 
wielojezycznosc - starting point
https://chatgpt.com/share/6775afb3-a2a0-8008-a8a9-50a7e202f8a2
2)
stylistyka obraz sie przesuwa jak naciskam menu navigacje


Dev environment to execute:
- ng serve
- npx json-server --watch /home/radek/Projects/hulboj/ajurweda/src/app/events/db.json --port 3000

