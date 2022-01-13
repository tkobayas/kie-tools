/*
 * Copyright (C) 2016 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.jboss.errai.common.client.dom;

import org.jboss.errai.common.client.api.annotations.BrowserEvent;

import jsinterop.annotations.JsProperty;
import jsinterop.annotations.JsType;

/**
 *
 * @deprecated Use Elemental 2 for new development
 *
 * @author Max Barkley <mbarkley@redhat.com>
 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent">Web API</a>
 */
@BrowserEvent({
  "touchcancel",
  "touchend",
  "touchmove",
  "touchstart",
  "touchenter",
  "touchleave"
})
@JsType(isNative = true)
@Deprecated
public interface TouchEvent extends UIEvent {

  @JsProperty(name = "altKey") boolean isAltKey();
  @JsProperty(name = "metaKey") boolean isMetaKey();
  @JsProperty(name = "ctrlKey") boolean isCtrlKey();
  @JsProperty(name = "shiftKey") boolean isShiftKey();
  @JsProperty TouchList getChangedTouches();
  @JsProperty TouchList getTargetTouches();
  @JsProperty TouchList getTouches();

}