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

import { getDecisionServicePropertiesRelativeToThisDmn } from "../../mutations/addExistingDecisionServiceToDrd";
import { buildXmlHref } from "@kie-tools/dmn-marshaller/dist/xml/xmlHrefs";
import { State } from "../Store";

export function computeContainingDecisionServiceHrefsByDecisionHrefs({
  thisDmnsNamespace,
  drgElementsByNamespace,
}: {
  thisDmnsNamespace: string;
  drgElementsByNamespace: Map<string, State["dmn"]["model"]["definitions"]["drgElement"]>;
}) {
  const decisionServiceHrefsByDecisionHrefs = new Map<string, string[]>();

  for (const [drgElementsNamespace, drgElements] of drgElementsByNamespace) {
    for (const drgElement of drgElements ?? []) {
      const drgElementHref = buildXmlHref({
        namespace: drgElementsNamespace === thisDmnsNamespace ? "" : drgElementsNamespace,
        id: drgElement["@_id"]!,
      });

      // Decision
      if (drgElement.__$$element === "decision") {
        decisionServiceHrefsByDecisionHrefs.set(
          drgElementHref,
          decisionServiceHrefsByDecisionHrefs.get(drgElementHref) ?? []
        );
      }
      // DS
      else if (drgElement.__$$element === "decisionService") {
        const { containedDecisionHrefsRelativeToThisDmn } = getDecisionServicePropertiesRelativeToThisDmn({
          thisDmnsNamespace,
          decisionServiceNamespace: drgElementsNamespace,
          decisionService: drgElement,
        });

        for (const containedDecisionHref of containedDecisionHrefsRelativeToThisDmn) {
          decisionServiceHrefsByDecisionHrefs.set(containedDecisionHref, [
            ...(decisionServiceHrefsByDecisionHrefs.get(containedDecisionHref) ?? []),
            drgElementHref,
          ]);
        }
      } else {
        // Ignore other elements
      }
    }
  }

  return decisionServiceHrefsByDecisionHrefs;
}
