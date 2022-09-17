pipeline {
    agent any

    stages {
        stage('Git download') {
            steps {
                git branch: 'main', url: ''
            }
        }
        stage('Install') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm install'
            }
        }
        stage('Run e2e test with Chrome Browser') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm run e2e:chrome'
            }
        }
        stage('Run e2e test with Microsoft Edge Browser') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm run e2e:edge'
            }
        }
        stage('Run negative test with Chrome Browser') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm run negative:chrome'
            }
        }
        stage('Run negative test with Microsoft Edge Browser') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm run negative:edge'
            }
        }
        stage('Generate allure report') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}