properties([
    [$class: 'jenkins.model.BuildDiscarderProperty', strategy: [$class: 'LogRotator', numToKeepStr: '96']],
    pipelineTriggers([[$class:"SCMTrigger", scmpoll_spec:"H/10 * * * *"]]),
])
pipeline {
  agent any
  options {
    skipDefaultCheckout(true)
  }
  define {
       def changedFiles = ""
       
     }
  
  stages {
    

    stage('Check Source') {
        steps {
            deleteDir()
            checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'PathRestriction', excludedRegions: '', includedRegions: '/products']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'jenkins-generated-ssh-key', name: 'customergit', url: 'git@github.com:AFactor/API-yamls-customers.git']]])

        }

    }

    stage ('get core') {
      steps {
        dir('core') {
        git url: 'git@github.com:AFactor/api-core.git',
        credentialsId: 'jenkins-generated-ssh-key'
    }
      }
    }

   stage('changelog print') {
     steps{
     script {
     
     def changeLogSets = currentBuild.changeSets
      for (int i = 0; i < changeLogSets.size(); i++) {
          def entries = changeLogSets[i].items
          for (int j = 0; j < entries.length; j++) {
              def entry = entries[j]
              //echo "${entry.commitId} by ${entry.author} on ${new Date(entry.timestamp)}: ${entry.msg}"
              def files = new ArrayList(entry.affectedFiles)
              for (int k = 0; k < files.size(); k++) {
                  def file = files[k]
                  changedFiles += ${file.path}
              }
          }
      }
      //sh "echo $changedFiles"
     }
     sh '''echo $changedFiles'''
     }
   }

    stage('Validate and Tokenize') {
      steps {
        sh returnStdout: true, script: '''core/Scripts/validatetokenize.sh'''
      }
    }
    stage('Copy to temp') {
      steps {
        sh returnStdout: true, script: '''core/Scripts/copy.sh'''
      }
    }
    stage('Deploy to API Cloud') {
      steps {
        configFileProvider([configFile(fileId: '14ce0658-5942-4980-a3cf-7bef5e1bd2c9', variable: 'ciConfig')]) {
        sh returnStdout: true, script: '''core/Scripts/deploy.sh'''
         }
      }
    }
  }
}