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
const path = require("path");
const { env } = require("./env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");

module.exports = (webpackEnv) =>
  merge(common(webpackEnv), {
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
      library: ["DMNEditor"],
      libraryTarget: "umd",
    },
    entry: {
      index: "./src/index.ts",
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./resources/index.html",
        chunks: ["index"],
        inject: false,
        minify: false,
      }),
      new ProvidePlugin({
        process: require.resolve("process/browser.js"),
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    module: {
      rules: [
        {
          test: /envelope\.js$/,
          type: "asset/source",
        },
      ],
    },
    optimization: {
      removeAvailableModules: true,
      sideEffects: true,
    },
    devServer: {
      historyApiFallback: false,
      static: [{ directory: path.join(__dirname, "./dist") }],
      compress: true,
      port: env.dmnEditorStandalone.dev.port,
    },
    performance: {
      hints: false,
    },
  });
