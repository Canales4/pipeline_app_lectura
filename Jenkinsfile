pipeline {
    agent any
    tools {
        maven 'maven360'
        nodejs 'node-11.10.0'
    }
    stages {
        stage('SCM Checkout') {
            steps {
                git credentialsId: 'usuariogit', url: 'https://github.com/LinoHallerRios/AppLecturas'
            }
        }
        stage('Install node modules') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                parallel 'Sonar Test': {
                    script {
                        withSonarQubeEnv('sonar-6'){
                            sh 'mvn verify sonar:sonar'
                        }
                        timeout(time: 30 , unit: 'MINUTES'){
                          def qg = waitForQualityGate()
                          if (qg.status != 'OK') {
                            error "Pipeline abortado por no pasar quality gates: ${qg.status}"
                          }
                        }
                    }
                }, 'Test': {
                      sh 'mvn verify'
                }
            }
        }
        stage('Deploy') {

        }
    }
}
