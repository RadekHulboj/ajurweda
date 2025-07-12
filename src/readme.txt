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
DONE  4.9) Contact page ma zle stylowanie poprawic i menu gap ustawic na 0 dla mobile device
DONE 4.91) Azure Container Apps (backend and fronted)
DONE 4.93) (Azure Port Gateway) czy Trafic Manager - traffic manager sie nie nadaje bo jest do Azure zasobow a nie on-prem a Application Gateway nie radzi sobie z certyfikatem 
            moze trzeba ten certfikat wrzucic do Azure KeyVault ale szkoda zachodu na Azure. To jest chmura nie na male projekty. wiec sam zrobi loadbalancer, reverse proxy 
    4.935) Lokalnie postawienie nginx (zamisat Applcation Gateway) + OVH CNAME (redirect z jola.hulboj.eu na ngrok)
     4.94) ng serve zamienic na produkcje angular
     4.95) Zainstalowac ingress do kubernetes na windows env
       75) clean code remove housing names 
DONE 75.2) sprawdzic jak dziala bez port-forward (dziala w minikube tunnel + etc/hosts + host na DNS (nazwa ustawiony nie ip i https a to nie super dla ngrok)
       76) css, photo store in db
       80) Bug git environment variable for email do not work only for email ??? see ayurveda.azure.email.password
REJECT 99) add MSAL for editor page Azure ConectID (to nadal wyglada hujowo)

// certbot bardzo fajne
sudo certbot certonly --manual --preferred-challenges=dns --email radekhulboj@gmail.com -d jola.hulboj.eu



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
scp  ../ajurweda/ayurveda-server.tar  radek@192.168.1.13:"C:\\Users\\radek\\Documents\\helm_ayurveda\\ayurveda-server.tar"
scp  ../ajurweda/angular-app.tar  radek@192.168.1.13:"C:\\Users\\radek\\Documents\\helm_ayurveda\\angular-app.tar"


// Bez PORTFORWARD
1) dziala https://angular-app.local/ ale gdy jest http://angular-app.local/ to juz nie dziala
2) w angular_ingress.yaml -> host: angular-app.local
3) run -> minikube tunnel
4) kubectl get ingress -A  
NAMESPACE   NAME               CLASS   HOSTS               ADDRESS        PORTS   AGE
default     ayurveda-ingress   nginx   angular-app.local   10.103.1.165   80      72m
3) sudo nano /etc/hosts -> 10.103.1.165 angular-app.local
lub
5) bez domain name
kubectl get ingress -A
NAMESPACE   NAME               CLASS   HOSTS   ADDRESS        PORTS   AGE
default     ayurveda-ingress   nginx   *       10.103.1.165   80      7h34m
minikube tunel 
i w przegladarce wpisujemy https://10.103.1.165  (bo adres jest nie z cluster brany z minikube ip, bo to nie jest PortNode,
tylko adres jest dynamicznie brany z warsty 7 http loadbalancera czyli 10.103.1.165 bo ingress go przydziela w kubernetes)

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

********************************************* FRONTED ************************************
kubectl port-forward service/angular-app-service 4200:4200
docker build -f docker/Dockerfile.angular -t angular-app .
docker tag angular-app:latest radekh6/angular-app:1.0
docker push radekh6/angular-app:1.0
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



*****************************************************   Azure Container apps   *************************************************

az group create --name ayurveda-rg --location polandcentral

az containerapp env create \
  --name ayurveda-env \
  --resource-group ayurveda-rg \
  --location polandcentral

az containerapp create \
  --name ayurveda-server \
  --resource-group ayurveda-rg \
  --environment ayurveda-env \
  --image docker.io/radekh6/ayurveda-server:1.0 \
  --cpu 0.5 --memory 1Gi \
  --ingress external \
  --target-port 8080 \
  --env-vars "SPRING_APPLICATION_NAME=Ayurveda" \
             "SPRING_DATASOURCE_URL=jdbc:h2:mem:testdb" \
             "SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.h2.Driver" \
             "SPRING_DATASOURCE_USERNAME=sa" \
             "SPRING_DATASOURCE_PASSWORD=" \
             "SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.H2Dialect" \
             "AZURE_KEYVAULT_URI=https://ayurveda-eu.vault.azure.net/" \
             "AYURVEDA_ALLOWED_CROSS_ORIGIN=http://angular-app.polandcentral.azurecontainerapps.io" \
             "AYURVEDA_AZURE_EMAIL_PASSWORD=enNzbWFxb254b3JhaWVhZQ==" \
             "AYURVEDA_AZURE_KEYVAULT_EMAIL_PASSWORD=YXl1cnZlZGEtZW1haWw="

az containerapp logs show --name ayurveda-server --resource-group ayurveda-rg --follow
az containerapp revision list --name ayurveda-server --resource-group ayurveda-rg
az containerapp logs show --name ayurveda-server --resource-group ayurveda-rg
az containerapp revision list --name ayurveda-server --resource-group ayurveda-rg --query "[].properties.runningStateDetails"
docker run --rm -e SPRING_DATASOURCE_URL=jdbc:h2:mem:testdb radekh6/ayurveda-server:1.0
az containerapp show --name ayurveda-server --resource-group ayurveda-rg --query properties.ingress.fqdn -o tsv
az containerapp list --resource-group ayurveda-rg --output table


// frontend

az containerapp create \
  --name angular-app \
  --resource-group ayurveda-rg \
  --environment ayurveda-env \
  --image docker.io/radekh6/angular-app:2.0 \
  --cpu 0.5 --memory 1Gi \
  --ingress external \
  --target-port 4200 \
  --env-vars "API_TARGET=ayurveda-server.redrock-11e93e23.polandcentral.azurecontainerapps.io"

az containerapp logs show --name angular-app --resource-group ayurveda-rg --follow
az containerapp update --name angular-app --resource-group ayurveda-rg --image docker.io/radekh6/angular-app:1.0
az containerapp revision restart --name angular-app --resource-group ayurveda-rg --revision angular-app--3yzpf7m



# cert manager

kubectl logs -n cert-manager deploy/cert-manager -f  #sprawdzenie logow cert manager
kubectl get clusterrolebinding -o wide | grep cert-manager

wyglada na to ze mam stworzyc wlasnego webhook dla cert managera
https://github.com/baarde/cert-manager-webhook-ovh


dig -t TXT _acme-challenge.jola.hulboj.eu