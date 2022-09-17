pipeline {
    agent any

    stages {
        stage('Git download') {
            steps {
                git branch: 'main', url: 'https://github.com/Valiantsin2021/test.git'
            }
        }
        stage('Install') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm install'
            }
        }
        stage('Run e2e test with Edge Browser') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm run e2e:chrome'
            }
        }
        stage('Generate allure report') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}