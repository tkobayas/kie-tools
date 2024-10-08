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

import { DMN15__tDefinitions } from "@kie-tools/dmn-marshaller/dist/schemas/dmn-1_5/ts-gen/types";
import { Normalized } from "@kie-tools/dmn-marshaller/dist/normalization/normalize";
import { addOrGetDrd } from "./addOrGetDrd";

export function updateExpressionWidths({
  definitions,
  drdIndex,
  widthsById,
}: {
  definitions: Normalized<DMN15__tDefinitions>;
  drdIndex: number;
  widthsById: Map<string, number[]>;
}): void {
  const { widthsExtension } = addOrGetDrd({ definitions, drdIndex });

  widthsExtension["kie:ComponentWidths"] = [...widthsById.entries()].map(([k, v]) => ({
    "@_dmnElementRef": k,
    "kie:width": v.map((vv) => ({ __$$text: vv })),
  }));
}
