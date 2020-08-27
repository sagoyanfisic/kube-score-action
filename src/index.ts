const kubeScore = require('./kubescore');
const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
  try {
    const kubeScoreVersion = core.getInput('kube-score-version');
    console.log(`Selected kube-score ${kubeScoreVersion || 'latest'} version!`);
    const manifestsFolders = core.getInput('manifests-folders');

    if(!manifestsFolders) {
      core.setFailed('[FATAL] Input for manifests-folders is mandatory');
    }

    const foldersArray = manifestsFolders.split(',');

    await kubeScore.downloadKubeScore();
    await kubeScore.runKubeScore(foldersArray);

    core.setOutput('score', 90);
    core.setOutput('raw-output', 'Just testing');
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
