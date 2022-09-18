pipeline {
    agent any

    stages {
        stage('Git download') {
            steps {
                git credentialsId: 'ce02e462-2d72-4f92-a2ac-2fce65442e18', url: 'https://github.com/Valiantsin2021/test.git'
            }
        }
        stage('Install') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm install'
            }
        }
        stage('Run e2e and login negative test suites with Chrome browser') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm run run:github'
            }
        }
        stage('Generate allure report') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}