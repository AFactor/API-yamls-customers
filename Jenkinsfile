properties([
    [$class: 'jenkins.model.BuildDiscarderProperty', strategy: [$class: 'LogRotator', numToKeepStr: '96']],
    pipelineTriggers([[$class:"SCMTrigger", scmpoll_spec:"H/10 * * * *"]]),
])
pipeline {
  agent any
  options {
    skipDefaultCheckout(true)
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

  //  stage('changelog print') {
  //    steps{
  //    script {
  //    def changedFiles = ""
  //    def changeLogSets = currentBuild.changeSets
  //     for (int i = 0; i < changeLogSets.size(); i++) {
  //         def entries = changeLogSets[i].items
  //         for (int j = 0; j < entries.length; j++) {
  //             def entry = entries[j]
  //             //echo "${entry.commitId} by ${entry.author} on ${new Date(entry.timestamp)}: ${entry.msg}"
  //             def files = new ArrayList(entry.affectedFiles)
  //             for (int k = 0; k < files.size(); k++) {
  //                 def file = files[k]
  //                 changedFiles += ${file.path}
  //             }
  //         }
  //     }
  //     //sh "echo $changedFiles"
  //    }
     
  //    }
  //  }

    stage('Validate and Tokenize') {
      steps {
        sh '''export PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin:/usr/local/apache-maven/apache-maven-3.3.9:/Users/Shared/Jenkins/Home/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/latest/lib/node_modules
              node -v
              npm install --prefix ./common/scripts
              node core/scripts/tokenize.js
              '''
      }
    }
    stage('Copy to temp') {
      steps {
        sh '''export PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin:/usr/local/apache-maven/apache-maven-3.3.9:/Users/Shared/Jenkins/Home/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/latest/lib/node_modules
              node -v
              b=$(git diff --name-only HEAD^ HEAD)
              node core/scripts/copy.js ${BUILD_TAG} $b
              '''
      }
    }
    stage('Deploy to API Cloud') {
      steps {
        configFileProvider([configFile(fileId: '14ce0658-5942-4980-a3cf-7bef5e1bd2c9', variable: 'ciConfig')]) {
        sh '''export PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin:/usr/local/apache-maven/apache-maven-3.3.9:/Users/Shared/Jenkins/Home/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/latest/lib/node_modules
              node -v
              b=$(git diff --name-only HEAD^ HEAD)
              node core/scripts/publish.js ${BUILD_TAG} $ciConfig $b'''
        }
      }
    }
  }
}