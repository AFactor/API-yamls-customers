properties([
    [$class: 'jenkins.model.BuildDiscarderProperty', strategy: [$class: 'LogRotator', numToKeepStr: '96']],
    pipelineTriggers([[$class:"SCMTrigger", scmpoll_spec:"H/10 * * * *"]]),
])
pipeline {
  agent any
  options {
    skipDefaultCheckout(true)
  }
  environment {
     fileNames="none"
  }
  
  stages {
    
    stage('Check Source') {
        steps {
            deleteDir()
            checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'PathRestriction', excludedRegions: '', includedRegions: 'products/.*']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'jenkins-generated-ssh-key', name: 'customergit', url: 'git@github.com:AFactor/API-yamls-customers.git']]])
            dir('core') {
              git url: 'git@github.com:AFactor/api-core.git',
              credentialsId: 'jenkins-generated-ssh-key'
            }
        }
    }

     

    stage('Validate and Tokenize') {
      when {
        expression {
            return  getChangeString() != "";
            }
        }
      steps {
        sh returnStdout: true, script: """ core/Scripts/validatetokenize.sh ${getChangeString()} """
      }
    }
    stage('Copy to temp') {
      when {
        expression {
            return  getChangeString() != "";
            }
        }
      steps {
        
        sh returnStdout: true, script: """ core/Scripts/copy.sh ${getChangeString()} """
      }
    }
    stage('Deploy to API Cloud') {
      when {
        expression {
            return  getChangeString() != "";
            }
        }
      steps {
        configFileProvider([configFile(fileId: '14ce0658-5942-4980-a3cf-7bef5e1bd2c9', variable: 'ciConfig')]) {
        sh returnStdout: true, script: '''core/Scripts/deploy.sh'''
         }
      }
    }
  }
}

 @NonCPS
def getChangeString() {
    MAX_MSG_LEN = 100
    def changeString = ""

    echo "Gathering SCM changes"
    def changeLogSets = currentBuild.changeSets
    for (int i = 0; i < changeLogSets.size(); i++) {
      def entries = changeLogSets[i].items
      for (int j = 0; j < entries.length; j++) {
        def entry = entries[j]
        def files = new ArrayList(entry.affectedFiles)
        for (int k = 0; k < files.size(); k++) {
            def file = files[k]
            if(file.path.contains("products/")){
              def arr = file.path.split("/");
              def fileName = arr[arr.length-1];
              changeString +=fileName + " ";
            }
        }
      }
    }

    if (!changeString) {
      changeString = ""
    }
    return changeString
  }
