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

import { expect } from "@playwright/test";
import { test } from "../__fixtures__/base";
import { DefaultNodeName, NodeType } from "../__fixtures__/nodes";

test.beforeEach(async ({ editor }) => {
  await editor.open();
});

test.describe("Delete edge - Association", () => {
  test.beforeEach(async ({ palette, nodes, edges }) => {
    await palette.dragNewNode({ type: NodeType.INPUT_DATA, targetPosition: { x: 100, y: 100 } });
    await nodes.dragNewConnectedNode({
      from: DefaultNodeName.INPUT_DATA,
      type: NodeType.TEXT_ANNOTATION,
      targetPosition: { x: 100, y: 300 },
    });

    await expect(
      await edges.get({ from: DefaultNodeName.INPUT_DATA, to: DefaultNodeName.TEXT_ANNOTATION })
    ).toBeAttached();
  });

  test("should delete an Association using the delete key", async ({ diagram, edges, nodes }) => {
    await diagram.resetFocus();
    await edges.delete({ from: DefaultNodeName.INPUT_DATA, to: DefaultNodeName.TEXT_ANNOTATION });

    await expect(
      await edges.get({ from: DefaultNodeName.INPUT_DATA, to: DefaultNodeName.TEXT_ANNOTATION })
    ).not.toBeAttached();

    await expect(nodes.get({ name: DefaultNodeName.INPUT_DATA })).toBeAttached();
    await expect(nodes.get({ name: DefaultNodeName.TEXT_ANNOTATION })).toBeAttached();
  });

  test("should delete an Association using the backspace key", async ({ diagram, edges, nodes }) => {
    await diagram.resetFocus();
    await edges.delete({ from: DefaultNodeName.INPUT_DATA, to: DefaultNodeName.TEXT_ANNOTATION, isBackspace: true });

    await expect(
      await edges.get({ from: DefaultNodeName.INPUT_DATA, to: DefaultNodeName.TEXT_ANNOTATION })
    ).not.toBeAttached();

    await expect(nodes.get({ name: DefaultNodeName.INPUT_DATA })).toBeAttached();
    await expect(nodes.get({ name: DefaultNodeName.TEXT_ANNOTATION })).toBeAttached();
  });
});
