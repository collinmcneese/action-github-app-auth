#!/bin/bash

# CI script to run NPM tests and capture the exit code if any tests fail

# Wrapper function to run a command and capture the exit code
function ci-run {
  echo "::Running: $@"
  $@
  local status=$?
  if [ $status -ne 0 ]; then
    echo "::Error: $@"
    exit $status
  fi
  return $status
}

ci-run npx eslint --ignore-path .eslintignore .
ci-run npx nyc mocha __test__/*.test.js
