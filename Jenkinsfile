pipeline {
    agent any
    tools {
        maven 'maven360'
        nodejs 'node-11.10.0'
    }
    stages {
        stage('SCM Checkout') {
            steps {
                git branch: 'development', credentialsId: 'gituser', url: 'https://github.com/LinoHallerRios/AppLecturas'
            }
        }
    }
}
