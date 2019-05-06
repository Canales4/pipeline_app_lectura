pipeline {
    agent any
    tools {
        nodejs 'node-11.10.0'
    }
    stages {
        stage('SCM Checkout') {
            steps {
                git credentialsId: 'jenk', url: 'git@github.com:LinoHallerRios/AppLecturas.git'
                script {
                  sh "mkdir app-lectura"
                  sh "cd app-lectura"
                }
            }
        }

        stage('Installando modulos de node') {
          steps {
            sh "npm install"
          }
        }

        stage('Build app') {
          steps {
            sh "npm start"
          }
        }

        stage('Sonar Gate') {
          steps{
            script {
              def scannerHome = tool 'sonar33';
              withSonarQubeEnv('sonar-6'){
                  sh "${scannerHome}/bin/sonar-scanner"
              }
              timeout(time: 30 , unit: 'MINUTES'){
                def qg = waitForQualityGate()
                if (qg.status != 'OK') {
                  error "Pipeline abortado por no pasar quality gates: ${qg.status}"
                }
              }
            }
          }
        }
    }
}
