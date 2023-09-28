const { core, getAppInstallationToken } = require('./github');

/**
 * The main action function
 * @returns {Promise<void>}
 */
async function action() {
  try {
    return await getAppInstallationToken();
  } catch (error) {
    core.error(error.message);
  }
}

action();
