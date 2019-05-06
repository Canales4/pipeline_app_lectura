pipeline {
    agent any
    tools {
        nodejs 'node-11.10.0'
    }
    stages {
        stage('SCM Checkout') {
            steps {
                git branch: 'development', credentialsId: 'jenk', url: 'git@github.com:LinoHallerRios/AppLecturas.git'
            }
        }
        stage('Install'){
          steps {
            sh "cp ./client/package.json ."
            sh "npm install"
          }
        }
        stage('Build'){
          steps {
            sh "cd ./client | npm run build"
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
