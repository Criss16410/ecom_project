pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        SONAR_PROJECT_KEY = 'ecom-backend'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonando repositorio desde GitHub...'
                git branch: 'main', url: 'https://github.com/Criss16410/ecom_project.git'
            }
        }

        stage('Instalar dependencias') {
            steps {
                echo 'Instalando dependencias del backend...'
                dir('backend') {
                    bat '"npm install"'
                }
            }
        }

        stage('Ejecutar pruebas') {
            steps {
                echo 'Ejecutando pruebas del backend...'
                dir('backend') {
                    bat 'echo "No hay pruebas definidas (npm test)"'
                }
            }
        }

        stage('Análisis con SonarQube') {
            steps {
                echo 'Iniciando análisis de calidad con SonarQube...'
                withSonarQubeEnv('MySonarQube') {
                    dir('backend') {
                        bat '''
                            sonar-scanner ^
                              -Dsonar.projectKey=%SONAR_PROJECT_KEY% ^
                              -Dsonar.sources=. ^
                              -Dsonar.language=js ^
                              -Dsonar.login=%SONAR_AUTH_TOKEN%
                        '''
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                echo 'Esperando resultado del Quality Gate...'
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completado con éxito. Análisis disponible en SonarQube.'
        }
        failure {
            echo '❌ El pipeline falló. Revisa los logs en Jenkins.'
        }
    }
}


