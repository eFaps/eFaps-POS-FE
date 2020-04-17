properties([
  [$class: 'jenkins.model.BuildDiscarderProperty', strategy: [$class: 'LogRotator', numToKeepStr: '25']],
  pipelineTriggers([[$class:"SCMTrigger", scmpoll_spec:"H/30 * * * *"]]),
])
pipeline {
  agent any
  stages {
    matrix {
      axes {
        axis {
          name 'NODEJS'
          values 'NodeJS-Latest', 'NodeJS-LTS'
        }
      }
      stage('Install dependencies') {
        steps {
          nodejs(${NODEJS}) {
            sh 'npm install'
          }
        }
      }
      stage('Build') {
        steps {
          nodejs(${NODEJS}) {
            sh 'npm run build'
          }
        }
      }
    }
  }
}
