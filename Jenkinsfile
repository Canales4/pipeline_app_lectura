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
            sh "npm install"
          }
        }
        stage('Build'){
          steps {
            sh "npm run build"
          }
        }
    }
}
