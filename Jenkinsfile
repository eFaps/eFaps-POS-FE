properties([
  [$class: 'jenkins.model.BuildDiscarderProperty', strategy: [$class: 'LogRotator', numToKeepStr: '25']],
  pipelineTriggers([[$class:"SCMTrigger", scmpoll_spec:"H/30 * * * *"]]),
])
pipeline {
  stages {
    stage('Build') {
      steps {
        withNPM() {
          sh 'npm install'
        }
      }
    }
  }
}
