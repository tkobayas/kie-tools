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

import React from "react";
import { connectField, HTMLFieldProps } from "uniforms/cjs";

import { buildDefaultInputElement, getInputReference, renderField } from "./utils/Utils";
import { useAddFormElementToContext } from "./CodeGenContext";
import { FormInput, InputReference } from "../api";
import { DEFAULT_DATA_TYPE_NUMBER } from "./utils/dataTypes";
import { getListItemName, getListItemOnChange, getListItemValue, ListItemProps } from "./rendering/ListItemField";

export type NumFieldProps = HTMLFieldProps<
  string,
  HTMLInputElement,
  {
    label: string;
    required: boolean;
    decimal?: boolean;
    min?: string;
    max?: string;
    itemProps?: ListItemProps;
  }
>;

const Num: React.FC<NumFieldProps> = (props: NumFieldProps) => {
  const ref: InputReference = getInputReference(props.name, DEFAULT_DATA_TYPE_NUMBER);

  const max = props.max ? `max={${props.max}}` : "";
  const min = props.min ? `min={${props.min}}` : "";

  const inputJsxCode = `<TextInput
      type={'number'}
      name={${props.itemProps?.isListItem ? getListItemName({ itemProps: props.itemProps, name: props.name }) : `'${props.name}'`}}
      isDisabled={${props.disabled || "false"}}
      id={'${props.id}'}
      placeholder={'${props.placeholder}'}
      step={${props.decimal ? 0.01 : 1}} ${max} ${min}
      value={${props.itemProps?.isListItem ? getListItemValue({ itemProps: props.itemProps, name: props.name }) : ref.stateName}}
      onChange={${props.itemProps?.isListItem ? getListItemOnChange({ itemProps: props.itemProps, name: props.name, callback: (value: string) => `Number(${value})` }) : `(e, newValue) => ${ref.stateSetter}(Number(newValue))`}}
    />`;

  const element: FormInput = buildDefaultInputElement({
    pfImports: ["TextInput"],
    inputJsxCode,
    ref,
    wrapper: {
      id: props.id,
      label: props.label,
      required: props.required,
    },
    disabled: props.disabled,
    itemProps: props.itemProps,
  });

  useAddFormElementToContext(element);

  return renderField(element);
};

export default connectField(Num);
