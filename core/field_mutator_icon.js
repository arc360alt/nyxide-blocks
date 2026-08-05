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
 * @fileoverview A small clickable "+"/"-" icon button used by blocks that
 * can grow or shrink their own inputs (e.g. if/else if/else, join).
 * Clicking it never opens an editor; instead it invokes a named method on
 * the source block. This extends Blockly.Field directly (NOT FieldLabel):
 * FieldLabel's init() intentionally skips wiring up mouse-down handling
 * since labels are meant to be non-interactive, so a FieldLabel-based
 * button is never actually clickable. It also draws its own fixed-size
 * vector icon rather than relying on text-width measurement, which is
 * unreliable (and can be permanently cached wrong) for fields that may be
 * created before the block is attached to the visible document.
 * @author nyxide-blocks
 */
'use strict';

goog.provide('Blockly.FieldMutatorIcon');

goog.require('Blockly.Field');
goog.require('goog.math.Size');


/**
 * Class for a clickable "+"/"-" icon button.
 * @param {string} iconType Either 'plus' or 'minus'.
 * @param {string} callbackName The name of the method to invoke on the
 *     source block when this field is clicked. Called with this field as
 *     its only argument.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldMutatorIcon = function(iconType, callbackName) {
  this.iconType_ = iconType;
  this.callbackName_ = callbackName;
  this.size_ = new goog.math.Size(
      Blockly.FieldMutatorIcon.SIZE, Blockly.FieldMutatorIcon.SIZE);
  this.text_ = '';
};
goog.inherits(Blockly.FieldMutatorIcon, Blockly.Field);

/**
 * Construct a FieldMutatorIcon from a JSON arg object.
 * @param {!Object} options A JSON object with options (iconType,
 *     callbackName).
 * @returns {!Blockly.FieldMutatorIcon} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldMutatorIcon.fromJson = function(options) {
  return new Blockly.FieldMutatorIcon(
      options['iconType'], options['callbackName']);
};

/**
 * Footprint of the icon, in workspace units. Fixed and never recomputed
 * from text metrics, so the block's layout is always deterministic.
 */
Blockly.FieldMutatorIcon.SIZE = 20;

/**
 * Length of each bar making up the drawn "+"/"-" glyph.
 */
Blockly.FieldMutatorIcon.BAR_LENGTH = 10;

/**
 * Thickness of each bar making up the drawn "+"/"-" glyph.
 */
Blockly.FieldMutatorIcon.BAR_THICKNESS = 2;

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
 * Install this icon on a block. Calls through to Blockly.Field's own init
 * (unlike FieldLabel) so that mouse-down handling and editable styling get
 * wired up normally, then hides the (unused) base text element and draws
 * the actual "+"/"-" glyph as plain white SVG bars.
 */
Blockly.FieldMutatorIcon.prototype.init = function() {
  if (this.fieldGroup_) {
    // Icon has already been initialized once.
    return;
  }
  Blockly.FieldMutatorIcon.superClass_.init.call(this);
  this.textElement_.style.display = 'none';

  var half = Blockly.FieldMutatorIcon.SIZE / 2;
  var barLength = Blockly.FieldMutatorIcon.BAR_LENGTH;
  var barThickness = Blockly.FieldMutatorIcon.BAR_THICKNESS;
  var radius = barThickness / 2;

  this.iconGroup_ = Blockly.utils.createSvgElement(
      'g', {'class': 'blocklyMutatorIconGraphic'}, this.fieldGroup_);
  // Horizontal bar - present for both the "+" and "-" glyphs.
  Blockly.utils.createSvgElement('rect', {
    'x': half - barLength / 2,
    'y': half - barThickness / 2,
    'width': barLength,
    'height': barThickness,
    'rx': radius,
    'ry': radius,
    'fill': '#ffffff'
  }, this.iconGroup_);
  if (this.iconType_ == 'plus') {
    // Vertical bar - only for the "+" glyph.
    Blockly.utils.createSvgElement('rect', {
      'x': half - barThickness / 2,
      'y': half - barLength / 2,
      'width': barThickness,
      'height': barLength,
      'rx': radius,
      'ry': radius,
      'fill': '#ffffff'
    }, this.iconGroup_);
  }
};

/**
 * The icon has a fixed footprint; never recompute it from (empty) text
 * metrics.
 */
Blockly.FieldMutatorIcon.prototype.updateWidth = function() {
  this.arrowWidth_ = 0;
  this.size_.width = Blockly.FieldMutatorIcon.SIZE;
};

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
