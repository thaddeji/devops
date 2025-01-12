# Guide de Déploiement DevOps

## **1. Création des Dockerfiles**

### Backend 

Créez un fichier `Dockerfile` dans le dossier backend contenant les instructions nécessaires pour conteneuriser le composant backend.

### **Frontend**

Créez un fichier `Dockerfile` dans le dossier `frontend` contenant les instructions nécessaires pour conteneuriser le composant frontend.

Chaque fichier doit définir les étapes nécessaires pour construire et exécuter leurs composants respectifs dans un conteneur Docker.

---

## **2. Configuration avec Docker Compose**

Créez un fichier `docker-compose.yml` à la racine du projet pour orchestrer les conteneurs backend et frontend.

Assurez-vous que les services sont configurés pour communiquer correctement entre eux.

```bash
docker-compose up --build
```

---

## **3. Configuration du CI avec Jenkins**

### **Pipeline CI**

Créez un fichier `Jenkinsfile` avec les étapes suivantes :

1. **Start** : Initialiser la pipeline.
2. **Checkout SCM** : Récupérer le code source depuis le dépôt.
3. **Build Server Image** : Construire l'image Docker pour le backend .
4. **Build Client Image** : Construire l'image Docker pour le frontend .
5. **Push Images to Docker Hub** : Pousser les images construites sur Docker Hub.
6. **End** : Terminer la pipeline.

---

## **4. Configuration du CD avec Kubernetes**

### **Manifests de Base**

Créez les fichiers manifests suivants dans le dossier `k8s` :

- `api-deployment.yaml` : Déploiement pour le backend.
- `api-service.yaml` : Service exposant le backend avec un NodePort.
- `frontend-deployment.yaml` : Déploiement pour le frontend.
- `frontend-service.yaml` : Service exposant le frontend avec un NodePort.
- `mongodb-deployment.yaml` : Déploiement pour la base de données.
- `mongodb-service.yaml` : Service exposant MongoDB avec un NodePort.
- `configmap.yaml` : Stockage des données de configuration sous forme de paires clé-valeur.

**Déploiement Local**

Appliquez les manifests dans le cluster Kubernetes local :

```bash
cd k8s
kubectl apply -f configmap.yaml
kubectl apply -f api-deployment.yaml
kubectl apply -f api-service.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f mongodb-service.yaml
```

Vérifiez que le service est accessible via l'adresse NodePort.

---

## **5. Déploiement avec Helm et ArgoCD**

### **Helm Charts**

Créez des Helm charts pour chaque composant dans le dossier `helm-charts` afin de simplifier et standardiser les déploiements.

```bash
mkdir helm-charts
cd helm
helm create api
helm create client
helm create database
```

### **Intégration avec ArgoCD**

1. Configurez ArgoCD pour surveiller les Helm charts.
2. Utilisez le tableau de bord ArgoCD pour gérer et synchroniser les déploiements.

### **Vérification**

Assurez-vous que les applications sont marquées comme **Healthy** et **Synced** dans l'interface ArgoCD.

---

