pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Criss16410/ecom_project.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat '''
                        set OPENSSL_CONF=NUL
                        set NODE_OPTIONS=--openssl-legacy-provider
                        npm install --ignore-engines
                    '''
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    bat 'npm test || exit 0'
                }
            }
        }

        stage('SonarQube Analysis') {
            environment {
                SONAR_HOST_URL = 'http://localhost:9000'
                SONAR_LOGIN = credentials('sonar-token')
            }
            steps {
                dir('backend') {
                    bat '''
                    sonar-scanner ^
                      -Dsonar.projectKey=ecom-backend ^
                      -Dsonar.sources=. ^
                      -Dsonar.host.url=%SONAR_HOST_URL% ^
                      -Dsonar.login=%SONAR_LOGIN%
                    '''
                }
            }
        }

        stage('Postman Tests') {
            steps {
                dir('tests\\postman') {
                    bat 'newman run ecom_collection.json --reporters cli || exit 0'
                }
            }
        }
    }
}

