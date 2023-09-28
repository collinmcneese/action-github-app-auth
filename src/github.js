const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const { createAppAuth } = require('@octokit/auth-app');

/**
 * Create a new authenticated Octokit client
 * @returns {Promise<Octokit>} - The authenticated Octokit client
 */
async function createOctokitClient() {
  if (!core.getInput('github_app_id')) {
    throw new Error('Input required and not supplied: github_app_id');
  }

  if (!core.getInput('github_app_private_key')) {
    throw new Error('Input required and not supplied: github_app_private_key');
  }

  if (!core.getInput('github_app_installation_id')) {
    throw new Error('Input required and not supplied: github_app_installation_id');
  }

  /**
   * @type {Octokit}
   * @see https://octokit.github.io/rest.js/v20
   */
  // Create a new Octokit client
  let octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: core.getInput('github_app_id'),
      privateKey: core.getInput('github_app_private_key'),
      installationId: core.getInput('github_app_installation_id'),
    },
  });

  return octokit;
}

/**
 * Generate and output a GitHub App installation token
 * Uses logic similar to https://github.com/actions/create-github-app-token but not that action directly due to repo limitations
 * @returns {Promise<void>}
 */
async function getAppInstallationToken() {
  let token = core.getState('appInstallationToken');
  if (token) {
    core.info('Re-using existing token from state');
  } else {
    try {
      let octokit = await createOctokitClient();
      let res = await octokit.auth({ type: 'installation' });
      core.setSecret(res.token);
      core.setOutput('token', res.token);
      core.saveState('appInstallationToken', res.token);
      core.info('Generated token and saved to state');
    } catch (error) {
      core.error(`Error generating token: ${error.message}`);
    }
  }
}

/**
 * Destroy a GitHub App installation token
 * @param {string} token - The token to destroy
 * @returns {Promise<void>}
 */
async function destroyAppInstallationToken({ token }) {
  if (token) {
    try {
      let octokit = new Octokit({
        auth: token,
      });
      await octokit.request('DELETE /installation/token');
      core.info('Destroyed token');
    } catch (error) {
      core.error(`Error destroying token: ${error.message}`);
    }
  } else {
    core.info('No token to destroy');
  }
}

module.exports = {
  core,
  createOctokitClient,
  getAppInstallationToken,
  destroyAppInstallationToken,
};
