pipeline {
    agent any

    tools {
<<<<<<< HEAD
        nodejs 'NodeJS'   // Debe coincidir con el nombre de la instalación NodeJS en Jenkins
    }

    environment {
        SONAR_PROJECT_KEY = 'ecom-backend'
=======
        nodejs "NodeJS"
>>>>>>> 0669f0e0b320bcf1c6ae25356853cb2115182b07
    }

    stages {

        stage('Checkout') {
            steps {
<<<<<<< HEAD
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
                    // Si no tienes pruebas aún, esto solo muestra un mensaje
                    bat 'echo "No hay pruebas definidas (npm test)"'
                }
            }
        }

        stage('Análisis con SonarQube') {
            steps {
                echo 'Iniciando análisis de calidad con SonarQube...'
                withSonarQubeEnv('MySonarQube') {   // Nombre configurado en Jenkins → Manage Jenkins → Configure System
                    dir('backend') {
                        bat '''
                            sonar-scanner ^
                              -Dsonar.projectKey=%SONAR_PROJECT_KEY% ^
                              -Dsonar.sources=. ^
                              -Dsonar.language=js ^
                              -Dsonar.login=%SONAR_AUTH_TOKEN%
                        '''
                    }
=======
                git branch: 'master',
                url: 'https://github.com/derejotienda/learn-pipeline-nodejs.git'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    bat """
                        npx sonar-scanner ^
                        -Dsonar.projectKey=learn-pipeline-nodejs ^
                        -Dsonar.sources=. ^
                        -Dsonar.host.url=http://localhost:9000 ^
                        -Dsonar.login=admin
                    """
>>>>>>> 0669f0e0b320bcf1c6ae25356853cb2115182b07
                }
            }
        }

        stage('Quality Gate') {
            steps {
<<<<<<< HEAD
                echo 'Esperando resultado del Quality Gate...'
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
=======
                script {
                    timeout(time: 2, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
>>>>>>> 0669f0e0b320bcf1c6ae25356853cb2115182b07
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


