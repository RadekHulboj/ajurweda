export const environment = {
    production: false,
    // to jest dla Azure Container Apps
    //  apiUrl: 'https://ayurveda-server.redrock-11e93e23.polandcentral.azurecontainerapps.io/api'


    // a to nie wiem co robi, moze dla ingress - trzeba sprawdzic
    apiUrl: '/api'

    // To jest dla Kubernetes dla service level (ale wydaje mi sie ze wystarczy po mojej zmianie uzywac API_TARGET, 
    // tylko to jest zle rozwiazanie bo uzywam dev env w kubernetes)
    // apiUrl: 'http://ayurveda-server-service:8080/api
    
  };
  