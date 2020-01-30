properties([
  [$class: 'jenkins.model.BuildDiscarderProperty', strategy: [$class: 'LogRotator', numToKeepStr: '25']],
  pipelineTriggers([[$class:"SCMTrigger", scmpoll_spec:"H/30 * * * *"]]),
])
pipeline {
  agent any
  stages {
    stage('Install dependencies') {
      steps {
        nodejs('NodeJS') {
          sh 'npm install'
        }
      }
    }
    stage('Build') {
      steps {
        nodejs('NodeJS') {
          sh 'npm run build'
        }
      }
    }
  }
}
