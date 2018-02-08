#!groovy
pipeline {
  def configFile = '14ce0658-5942-4980-a3cf-7bef5e1bd2c9'
  agent any
  stages {
    stage('copy and deploy') {
      
      steps {
        configFileProvider([configFile(fileId: configFile, variable: 'ciConfig')]) {
          sh '''export PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin:/usr/local/apache-maven/apache-maven-3.3.9:/Users/Shared/Jenkins/Home/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/latest/lib/node_modules
              node -v
              npm install --prefix ./common/scripts
              b=$(git diff --name-only HEAD^ HEAD)
              node ./common/scripts/copy.js ${BUILD_TAG} $ciConfig $b
              node ./common/scripts/publish.js ${BUILD_TAG} $ciConfig $b'''
        }
        
      }
    }
  }
}