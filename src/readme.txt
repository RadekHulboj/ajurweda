DONE    1) springboot replace db.json to h2
DONE    1.5) Merge backend with fronted   
DONE    1.6) docker compose for new backend
DONE    3) add Azure KeyVault for keeping secretes (for google.password), sent email from contact page
        4) kuebernetes
       75) clean code remove housing names 
       76) css, photo store in db
       80) Bug environment variable for email do not work only for email ??? see ayurveda.azure.email.password
REJECT 99) add MSAL for editor page Azure ConectID (to nadal wyglada hujowo)


//BACKEND
eval $(minikube docker-env)
eval $(minikube docker-env --unset)
docker build -f docker/Dockerfile -t ayurveda-server .
// na to stracilem w huj czasu
docker save ayurveda-server -o ayurveda-server.tar
minikube image load ayurveda-server.tar


//FRONTED
docker build -f ./Dockerfile.angular -t angular-app ../../ajurweda
docker build -f ./Dockerfile.json-server -t json-server ../../ajurweda

for Springboot backend
radek@radek-B660M-DS3H-AX-DDR4:~/Projects/hulboj/ajurweda/docker$ docker-compose -f docker-compose-springboot.yml up

MSAL Angular example
 
1) 
wielojezycznosc - starting point
https://chatgpt.com/share/6775afb3-a2a0-8008-a8a9-50a7e202f8a2
2)
stylistyka obraz sie przesuwa jak naciskam menu navigacje


Dev environment to execute:
- ng serve
- npx json-server --watch /home/radek/Projects/hulboj/ajurweda/src/app/events/db.json --port 3000

