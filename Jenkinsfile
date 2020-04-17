properties([
  [$class: 'jenkins.model.BuildDiscarderProperty', strategy: [$class: 'LogRotator', numToKeepStr: '25']],
  pipelineTriggers([[$class:"SCMTrigger", scmpoll_spec:"H/30 * * * *"]]),
])
pipeline {
  agent any
  stages {
    stage('Install and build - LTS') {
      steps {
        nodejs('NodeJS-LTS') {
          sh 'npm clean-install'
          sh 'npm run build'
        }
      }
    }
    stage('Install and build - Latest') {
      steps {
        nodejs('NodeJS-Latest') {
          sh 'npm clean-install'
          sh 'npm run build'
        }
      }
    }
  }
}
