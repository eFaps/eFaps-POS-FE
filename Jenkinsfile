properties([
  [$class: 'jenkins.model.BuildDiscarderProperty', strategy: [$class: 'LogRotator', numToKeepStr: '25']],
  pipelineTriggers([[$class:"SCMTrigger", scmpoll_spec:"H/30 * * * *"]]),
])
pipeline {
  agent any
  stages {
    stage('Install - LTS') {
      steps {
        sh 'rm -r node_modules/'
        nodejs('NodeJS-LTS') {
          sh 'npm install'
        }
      }
    }
    stage('Build - LTS') {
      steps {
        nodejs('NodeJS-LTS') {
          sh 'npm run build'
        }
      }
    }
    stage('Install - Latest') {
      steps {
        sh 'rm -r node_modules/'
        nodejs('NodeJS-Latest') {
          sh 'npm install'
        }
      }
    }
    stage('Build - Latest') {
      steps {
        nodejs('NodeJS-Latest') {
          sh 'npm run build'
        }
      }
    }
  }
}
