pipeline {
    agent any
    tools {
        maven 'maven360'
        nodejs 'node-11.10.0'
    }
    stages {
        stage('SCM Checkout') {
            steps {
                git credentialsId: 'jenk', url: 'git@github.com:pruebajenk/repoprivado-ssh-try.git'
            }
        }

        stage('Sonar Gate') {
          steps{
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
          }
        }
    }
}
