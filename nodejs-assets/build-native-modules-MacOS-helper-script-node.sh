#!/bin/bash
      # Helper script for Gradle to call node on macOS in case it is not found
      export PATH=$PATH:/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/ryrz01/Downloads/nodeReactNative/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/ryrz01/Downloads/nodeReactNative/node_modules/.bin:/Users/ryrz01/google-cloud-sdk/bin:/Users/ryrz01/Library/Android/sdk/platform-tools:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
      node $@
    