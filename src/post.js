// This is a special file that runs at the end of the action in a post step.

const { core, destroyAppInstallationToken } = require('./github');

// Clean up the GitHub App installation token during this run
let token = core.getState('appInstallationToken');
destroyAppInstallationToken({ token });
