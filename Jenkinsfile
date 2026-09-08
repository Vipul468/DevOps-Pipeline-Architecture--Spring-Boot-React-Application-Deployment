pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'YOUR_DOCKERHUB_USERNAME'
        BACKEND_IMAGE = "${DOCKERHUB_USER}/devops-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/devops-frontend"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn -B clean test package'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm ci || npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./backend'
                sh 'docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh 'docker push ${BACKEND_IMAGE}:${IMAGE_TAG}'
                    sh 'docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}'
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sh 'sed -i "s|YOUR_DOCKERHUB_USERNAME|${DOCKERHUB_USER}|g" k8s/backend.yaml k8s/frontend.yaml'
                sh 'sed -i "s|IMAGE_TAG_PLACEHOLDER|${IMAGE_TAG}|g" k8s/backend.yaml k8s/frontend.yaml'
                sh 'ansible-playbook -i ansible/inventory ansible/deploy.yml'
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}
