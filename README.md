# Spring Boot + React + Jenkins + Docker + Ansible + Kubernetes

End-to-end DevOps demo project matching the requested architecture.

## Stack
- Spring Boot REST API
- React + Vite frontend
- Docker
- Docker Hub
- Jenkins Pipeline
- Ansible
- Kubernetes

## Project structure

```text
devops-spring-react-project/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/example/devopsapp/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
├── k8s/
│   ├── namespace.yaml
│   ├── backend.yaml
│   └── frontend.yaml
├── ansible/
│   ├── inventory
│   └── deploy.yml
├── Jenkinsfile
├── docker-compose.yml
└── .gitignore
```

## 1. Run locally without Kubernetes

Requirements:
- Java 17+
- Maven 3.9+
- Node.js 20+
- Docker Desktop

Backend:
```powershell
cd backend
mvn spring-boot:run
```

Frontend in another terminal:
```powershell
cd frontend
npm install
npm run dev
```

Open:
http://localhost:5173

Backend API:
http://localhost:8080/api/employees

## 2. Run everything with Docker Compose

```powershell
docker compose up --build
```

Open:
http://localhost:3000

API:
http://localhost:3000/api/employees

Stop:
```powershell
docker compose down
```

## 3. Docker Hub

Login:
```powershell
docker login
```

Build:
```powershell
docker build -t YOUR_DOCKERHUB_USERNAME/devops-backend:1.0 ./backend
docker build -t YOUR_DOCKERHUB_USERNAME/devops-frontend:1.0 ./frontend
```

Push:
```powershell
docker push YOUR_DOCKERHUB_USERNAME/devops-backend:1.0
docker push YOUR_DOCKERHUB_USERNAME/devops-frontend:1.0
```

Then change image names in:
- k8s/backend.yaml
- k8s/frontend.yaml

## 4. Kubernetes

A running Kubernetes cluster and kubectl are required.

```powershell
kubectl apply -f k8s/
kubectl get pods -n devops-demo
kubectl get svc -n devops-demo
```

For Docker Desktop Kubernetes, the frontend service is NodePort.

For a cloud Kubernetes cluster, change the frontend service to LoadBalancer.

## 5. Ansible

Ansible deploys the Kubernetes manifests using kubectl.

Edit `ansible/inventory` if needed. The default inventory uses localhost.

Run:
```bash
ansible-playbook -i ansible/inventory ansible/deploy.yml
```

The machine running Ansible must have:
- kubectl
- a valid kubeconfig
- access to the Kubernetes cluster

## 6. Jenkins

Create a Jenkins credential:
- Kind: Username with password
- ID: `dockerhub-creds`
- Username: your Docker Hub username
- Password: Docker Hub access token

Update the image names in Jenkinsfile if your Docker Hub username differs.

Pipeline:
1. Checkout
2. Build/test Spring Boot
3. Build React
4. Docker build
5. Docker push
6. Ansible deployment

## 7. Useful verification commands

```powershell
kubectl get all -n devops-demo
kubectl logs deployment/devops-backend -n devops-demo
kubectl logs deployment/devops-frontend -n devops-demo
kubectl get svc -n devops-demo
```

API test:
```powershell
curl http://localhost:8080/api/employees
```

## Important

This is a complete starter project. Replace `YOUR_DOCKERHUB_USERNAME` with your actual Docker Hub username before pushing images.
