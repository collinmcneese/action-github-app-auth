# action-github-app-auth

Minimal Action to use for authenticating as a GitHub App within Actions

Loosely based on [actions/create-github-app-token](https://github.com/actions/create-github-app-token) but more targeted to generate an installation token for all scopes available to a provided installation id.

## Usage

```yaml
- uses: collinmcneese/action-github-app-auth@v1
  id: auth
  with:
    app_id: ${{ secrets.APP_ID }}
    private_key: ${{ secrets.PRIVATE_KEY }}
    installation_id: ${{ secrets.INSTALLATION_ID }}
```

## Inputs

### `github_app_id`

**Required** The ID of the GitHub App.

### `github_app_private_key`

**Required** The private key of the GitHub App.

### `github_app_installation_id`

**Required** The ID of the installation of the GitHub App.

## Outputs

### `token`

The generated installation token.

## Example

```yaml
name: Example Workflow

on:
  pull_request:

jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - uses: collinmcneese/action-github-app-auth@v1
        id: auth
        with:
          app_id: ${{ secrets.APP_ID }}
          private_key: ${{ secrets.PRIVATE_KEY }}
          installation_id: ${{ secrets.INSTALLATION_ID }}
      - uses: actions/checkout@v4
        with:
          token: ${{ steps.auth.outputs.token }}
```
