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

const { merge } = require("webpack-merge");
const common = require("@kie-tools-core/webpack-base/webpack.common.config");
const CopyPlugin = require("copy-webpack-plugin");
const patternflyBase = require("@kie-tools-core/patternfly-base");

module.exports = (webpackEnv) => [
  merge(common(webpackEnv), {
    entry: {
      "preprocessor/preprocessor": "./src/preprocessor/preprocessor.ts",
    },
    plugins: [new CopyPlugin({ patterns: [{ from: "./resources", to: "./resources" }] })],
    target: "node",
    node: {
      __dirname: true, //Uses current working dir
      __filename: true, //Uses current working dir
    },
  }),
  merge(common(webpackEnv), {
    output: {
      publicPath: "",
    },
    entry: {
      "envelope/swf-combined-editor-envelope": "./src/envelope/SwfCombinedEditorEnvelopeApp.ts",
    },
    module: {
      rules: [...patternflyBase.webpackModuleRules],
    },
  }),
];
