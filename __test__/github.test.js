const { createOctokitClient, getAppInstallationToken, destroyAppInstallationToken} = require('../src/github');
const { describe, it } = require('mocha');
const assert = require('assert');
const sinon = require('sinon');

describe('createOctokitClient', () => {
  it('should throw an error if the GitHub App ID is not set', async () => {
    try {
      process.env['INPUT_GITHUB_APP_ID'] = '';
      process.env['INPUT_GITHUB_APP_PRIVATE_KEY'] = '1234';
      process.env['INPUT_GITHUB_APP_INSTALLATION_ID'] = '1234';

      await createOctokitClient();
    } catch (error) {
      assert.equal(error.message, 'Input required and not supplied: github_app_id');
    }
  });

  it('should throw an error if the GitHub App private key is not set', async () => {
    try {
      process.env['INPUT_GITHUB_APP_ID'] = '1234';
      process.env['INPUT_GITHUB_APP_PRIVATE_KEY'] = '';
      process.env['INPUT_GITHUB_APP_INSTALLATION_ID'] = '1234';

      await createOctokitClient();
    } catch (error) {
      assert.equal(error.message, 'Input required and not supplied: github_app_private_key');
    }
  });

  it('should throw an error if the GitHub App installation ID is not set', async () => {
    try {
      process.env['INPUT_GITHUB_APP_ID'] = '1234';
      process.env['INPUT_GITHUB_APP_PRIVATE_KEY'] = '1234';
      process.env['INPUT_GITHUB_APP_INSTALLATION_ID'] = '';

      await createOctokitClient();
    } catch (error) {
      assert.equal(error.message, 'Input required and not supplied: github_app_installation_id');
    }
  });
});
