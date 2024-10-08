/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import CopyPlugin from "copy-webpack-plugin";
import patternflyBase from "@kie-tools-core/patternfly-base";
import { merge } from "webpack-merge";
import common from "@kie-tools-core/webpack-base/webpack.common.config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { ProvidePlugin } from "webpack";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import { defaultEnvJson } from "./build/defaultEnvJson";

export default async (webpackEnv: any, webpackArgv: any) => {
  return merge(common(webpackEnv), {
    entry: {
      index: "./src/index.tsx",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./static/index.html",
        inject: false,
        minify: false,
      }),
      new CopyPlugin({
        patterns: [
          { from: "./static/resources", to: "./resources" },
          { from: "./static/images", to: "./images" },
          { from: "./static/favicon.svg", to: "./favicon.svg" },
          {
            from: "./static/env.json",
            to: "./env.json",
            transform: () => JSON.stringify(defaultEnvJson, null, 2),
          },
        ],
      }),
      new ProvidePlugin({
        process: require.resolve("process/browser.js"),
        Buffer: ["buffer", "Buffer"],
      }),
      new NodePolyfillPlugin(),
    ],
    ignoreWarnings: [
      {
        // The @apidevtools sub-packages source maps are not published, so we need to ignore their warnings for now.
        module: /@apidevtools/,
      },
      {
        // The @jsdevtools sub-packages source maps are not published, so we need to ignore their warnings for now.
        module: /@jsdevtools/,
      },
    ],
    module: {
      rules: [...patternflyBase.webpackModuleRules],
    },
  });
};
