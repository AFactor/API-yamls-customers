pipeline {
  agent any
  stages {
    stage('copy and deploy') {
      steps {
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