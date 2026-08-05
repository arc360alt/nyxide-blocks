/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2024 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview A small clickable text field used as an inline "+"/"-"
 * style button for blocks that can grow or shrink their own inputs (e.g.
 * if/else if/else, join). Clicking it never opens an editor; instead it
 * invokes a named method on the source block.
 * @author nyxide-blocks
 */
'use strict';

goog.provide('Blockly.FieldMutatorIcon');

goog.require('Blockly.Field');
goog.require('Blockly.FieldLabel');


/**
 * Class for a clickable inline mutator button (e.g. "+ else if", "-").
 * @param {string} text The glyph/label to display.
 * @param {string} callbackName The name of the method to invoke on the
 *     source block when this field is clicked. Called with this field as
 *     its only argument.
 * @param {string=} opt_class Optional CSS class for the field's text.
 * @extends {Blockly.FieldLabel}
 * @constructor
 */
Blockly.FieldMutatorIcon = function(text, callbackName, opt_class) {
  Blockly.FieldMutatorIcon.superClass_.constructor.call(
      this, text, opt_class || 'blocklyMutatorIconText');
  this.callbackName_ = callbackName;
};
goog.inherits(Blockly.FieldMutatorIcon, Blockly.FieldLabel);

/**
 * Mutator icons are clickable, unlike normal labels.
 * @type {boolean}
 */
Blockly.FieldMutatorIcon.prototype.EDITABLE = true;

/**
 * Mutator icons are UI-only and should never be serialized as field values.
 * @type {boolean}
 */
Blockly.FieldMutatorIcon.prototype.SERIALIZABLE = false;

/**
 * Mouse cursor style when over this field.
 */
Blockly.FieldMutatorIcon.prototype.CURSOR = 'pointer';

/**
 * There is no editor to show; instead invoke the callback on the source
 * block, if one is registered.
 * @private
 */
Blockly.FieldMutatorIcon.prototype.showEditor_ = function() {
  var block = this.sourceBlock_;
  if (!block || block.isInFlyout || !this.callbackName_) {
    return;
  }
  if (typeof block[this.callbackName_] == 'function') {
    block[this.callbackName_](this);
  }
};

Blockly.Field.register('field_mutator_icon', Blockly.FieldMutatorIcon);
