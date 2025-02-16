DONE    1) springboot replace db.json to h2
DONE  1.5) Merge backend with fronted   
DONE  1.6) docker compose for new backend
DONE    3) add Azure KeyVault for keeping secretes (for google.password), sent email from contact page
DONE    4) kuebernetes + ingress
DONE  4.4) ok-> kubectl port-forward --namespace ingress-nginx service/ingress-nginx-controller 4200:80 (port 4200 chodzi)
DONE  4.5) helm
DONE  4.6) Instalacja na Win 11 
DONE  4.7) make angular production on image
DONE  4.8) Moblie device look like 
       75) clean code remove housing names 
DONE 75.2) sprawdzic jak dziala bez port-forward (dziala w minikube tunnel + etc/hosts + host na DNS (nazwa ustawiony nie ip i https a to nie super dla ngrok)
     75.5) ng serve zamienic na produkcje angular
       76) css, photo store in db
       80) Bug git environment variable for email do not work only for email ??? see ayurveda.azure.email.password
REJECT 99) add MSAL for editor page Azure ConectID (to nadal wyglada hujowo)



// ingress
1) chatgot installacja ingress na kubernetes
2)
kubectl get ingress
kubectl logs -n ingress-nginx <nginx-ingress-pod-name>
kubectl describe ingress ayurveda-ingress


// To bedzie potrzebne do inwestygacji
//sending email challange on nginx
kl exec -it pod/ayurveda-server-d57b87474-5mdpv -- curl -X POST http://ayurveda-server-service:8080/api/contact -d '{"firstName": "John", "lastName": "Hulboj", "email": "radek@example.com", "message": "z palca"}' -H "Content-Type: application/json"
kubectl logs -l app.kubernetes.io/name=ingress-nginx -n ingress-nginx
scp  ../ajurweda/ayurveda-server.tar  radek@192.168.1.11:"C:\\Users\\radek\\ayurveda-server.tar"
scp  ../ajurweda/angular-app.tar  radek@192.168.1.11:"C:\\Users\\radek\\angular-app.tar"


// Bez PORTFORWARD
1) dziala https://angular-app.local/ ale gdy jest http://angular-app.local/ to juz nie dziala
2) w angular_ingress.yaml -> host: angular-app.local
3) run -> minikube tunnel
4) kubectl get ingress -A  
NAMESPACE   NAME               CLASS   HOSTS               ADDRESS        PORTS   AGE
default     ayurveda-ingress   nginx   angular-app.local   10.103.1.165   80      72m
3) sudo nano etc/hosts -> 10.103.1.165 angular-app.local



//BACKEND
eval $(minikube docker-env)
eval $(minikube docker-env --unset)
docker build -f docker/Dockerfile -t ayurveda-server .
docker save ayurveda-server -o ayurveda-server.tar
minikube image load ayurveda-server.tar
minikube ssh -- docker images
kubectl port-forward service/angular-app-service 4200:4200
kubectl port-forward --namespace ingress-nginx service/ingress-nginx-controller 4200:80 (to localhost:4200)
kubectl port-forward --namespace ingress-nginx service/ingress-nginx-controller 8080:80 (to locahost:8080)
helm upgrade -i ayurveda  ./ayurveda --values=./ayurveda/env/values-dev.yaml

//FRONTED
kubectl port-forward service/angular-app-service 4200:4200
docker build -f docker/Dockerfile.angular -t angular-app .
docker save angular-app -o angular-app.tar
minikube image load angular-app.tar
minikube ssh -- docker images



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

