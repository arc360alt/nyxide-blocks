/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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

'use strict';

goog.provide('Blockly.Blocks.operators');
goog.provide('Blockly.Constants.Operators');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['operator_add'] = {
  /**
   * Block for adding two numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_ADD,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_subtract'] = {
  /**
   * Block for subtracting two numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_SUBTRACT,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_multiply'] = {
  /**
   * Block for multiplying two numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_MULTIPLY,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_divide'] = {
  /**
   * Block for dividing two numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_DIVIDE,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_random'] = {
  /**
   * Block for picking a random number.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_RANDOM,
      "args0": [
        {
          "type": "input_value",
          "name": "FROM"
        },
        {
          "type": "input_value",
          "name": "TO"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_lt'] = {
  /**
   * Block for less than comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_LT,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_equals'] = {
  /**
   * Block for equals comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_EQUALS,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_gt'] = {
  /**
   * Block for greater than comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_GT,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_and'] = {
  /**
   * Block for "and" boolean comparator. Expandable: a "+"/"-" pair lets the
   * user chain on more operands ("a and b and c ..."). Blocks saved before
   * this feature existed have no <mutation> and load with exactly the
   * original two-operand shape, so this is fully backwards compatible.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_AND,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1",
          "check": "Boolean"
        },
        {
          "type": "input_value",
          "name": "OPERAND2",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "mutator": "operator_and_mutator",
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_or'] = {
  /**
   * Block for "or" boolean comparator. Expandable: a "+"/"-" pair lets the
   * user chain on more operands ("a or b or c ..."). Blocks saved before
   * this feature existed have no <mutation> and load with exactly the
   * original two-operand shape, so this is fully backwards compatible.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_OR,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1",
          "check": "Boolean"
        },
        {
          "type": "input_value",
          "name": "OPERAND2",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "mutator": "operator_or_mutator",
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

/**
 * Generic helper for applying a shape-changing function to an expandable
 * operator block: re-renders it and fires a 'mutation' change event if the
 * shape actually changed, so the change is undoable.
 * @param {!Blockly.Block} block The block to mutate.
 * @param {function(!Blockly.Block)} mutateFn Callback that performs the
 *     actual shape change.
 * @private
 */
Blockly.Constants.Operators.applyMutation_ = function(block, mutateFn) {
  var oldMutationDom = block.mutationToDom();
  var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
  mutateFn(block);
  if (block.rendered) {
    block.render();
    block.bumpNeighbours_();
  }
  var newMutationDom = block.mutationToDom();
  var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
  if (Blockly.Events.isEnabled() && oldMutation != newMutation) {
    Blockly.Events.fire(new Blockly.Events.BlockChange(
        block, 'mutation', null, oldMutation, newMutation));
  }
};

/**
 * Mixin adding extra chained operands to operator_and / operator_or. Both
 * blocks start with OPERAND1/OPERAND2 from jsonInit; this appends
 * OPERAND3, OPERAND4, ... as the user clicks "+".
 * @mixin
 * @package
 */
Blockly.Constants.Operators.EXPANDABLE_BOOLEAN_CHAIN_MUTATOR_MIXIN = {
  /**
   * @param {string} connectorText The word shown before each extra operand
   *     ("and"/"or").
   * @this Blockly.Block
   * @package
   */
  setUpExpandableChain_: function(connectorText) {
    this.operandCount_ = 2;
    this.chainConnectorText_ = connectorText;

    this.addOperandIcon_ =
        new Blockly.FieldMutatorIcon('plus', 'addChainOperand_');
    this.removeOperandIcon_ =
        new Blockly.FieldMutatorIcon('minus', 'removeChainOperand_');
    this.appendDummyInput('CHAIN_CONTROLS')
        .appendField(this.addOperandIcon_, 'ADD_OPERAND')
        .appendField(this.removeOperandIcon_, 'REMOVE_OPERAND');
    this.updateChainControlsVisibility_();
  },

  /**
   * @return {Element} A <mutation> element with the current operand count,
   *     or null if this block still has just its original two operands.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (this.operandCount_ === 2) {
      return null;
    }
    var container = document.createElement('mutation');
    container.setAttribute('items', this.operandCount_);
    return container;
  },

  /**
   * @param {!Element} xmlElement Contains the number of operands.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var target = parseInt(xmlElement.getAttribute('items'), 10) || 2;
    this.updateChainShape_(target);
  },

  /**
   * @param {number} targetCount Desired number of inputs.
   * @this Blockly.Block
   */
  updateChainShape_: function(targetCount) {
    targetCount = Math.max(2, targetCount);
    while (this.operandCount_ > targetCount) {
      this.removeLastChainOperand_();
    }
    while (this.operandCount_ < targetCount) {
      this.appendChainOperand_();
    }
    this.updateChainControlsVisibility_();
  },

  /**
   * @this Blockly.Block
   */
  appendChainOperand_: function() {
    this.operandCount_++;
    var n = this.operandCount_;
    this.appendValueInput('OPERAND' + n)
        .setCheck('Boolean')
        .appendField(this.chainConnectorText_);
    this.moveInputBefore('OPERAND' + n, 'CHAIN_CONTROLS');
  },

  /**
   * Removes the most recently added operand. Any block plugged into it is
   * unplugged, not deleted. Never removes below the original two operands.
   * @this Blockly.Block
   */
  removeLastChainOperand_: function() {
    if (this.operandCount_ <= 2) {
      return;
    }
    var n = this.operandCount_;
    this.removeInput('OPERAND' + n);
    this.operandCount_--;
  },

  /**
   * @this Blockly.Block
   */
  updateChainControlsVisibility_: function() {
    this.removeOperandIcon_.setVisible(this.operandCount_ > 2);
  },

  /**
   * Click handler for the "+" button.
   * @this Blockly.Block
   */
  addChainOperand_: function() {
    Blockly.Constants.Operators.applyMutation_(this, function(block) {
      block.appendChainOperand_();
      block.updateChainControlsVisibility_();
    });
  },

  /**
   * Click handler for the "-" button.
   * @this Blockly.Block
   */
  removeChainOperand_: function() {
    Blockly.Constants.Operators.applyMutation_(this, function(block) {
      block.removeLastChainOperand_();
      block.updateChainControlsVisibility_();
    });
  }
};

Blockly.Extensions.registerMutator('operator_and_mutator',
    Blockly.Constants.Operators.EXPANDABLE_BOOLEAN_CHAIN_MUTATOR_MIXIN,
    function() {
      this.setUpExpandableChain_(Blockly.Msg.OPERATORS_AND_CONNECTOR || 'and');
    });

Blockly.Extensions.registerMutator('operator_or_mutator',
    Blockly.Constants.Operators.EXPANDABLE_BOOLEAN_CHAIN_MUTATOR_MIXIN,
    function() {
      this.setUpExpandableChain_(Blockly.Msg.OPERATORS_OR_CONNECTOR || 'or');
    });

Blockly.Blocks['operator_not'] = {
  /**
   * Block for "not" unary boolean operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_NOT,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_join'] = {
  /**
   * Block for string join operator. Expandable: a "+"/"-" pair lets the
   * user join more than two strings together. Blocks saved before this
   * feature existed have no <mutation> and load with exactly the original
   * two-string shape, so this is fully backwards compatible.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_JOIN,
      "args0": [
        {
          "type": "input_value",
          "name": "STRING1"
        },
        {
          "type": "input_value",
          "name": "STRING2"
        }
      ],
      "category": Blockly.Categories.operators,
      "mutator": "operator_join_mutator",
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

/**
 * Mixin adding extra chained strings to operator_join. The block starts
 * with STRING1/STRING2 from jsonInit; this appends STRING3, STRING4, ...
 * as the user clicks "+".
 * @mixin
 * @package
 */
Blockly.Constants.Operators.EXPANDABLE_JOIN_MUTATOR_MIXIN = {
  /**
   * @this Blockly.Block
   * @package
   */
  setUpExpandableJoin_: function() {
    this.itemCount_ = 2;

    this.addItemIcon_ = new Blockly.FieldMutatorIcon('plus', 'addJoinItem_');
    this.removeItemIcon_ =
        new Blockly.FieldMutatorIcon('minus', 'removeJoinItem_');
    this.appendDummyInput('JOIN_CONTROLS')
        .appendField(this.addItemIcon_, 'ADD_ITEM')
        .appendField(this.removeItemIcon_, 'REMOVE_ITEM');
    this.updateJoinControlsVisibility_();
  },

  /**
   * @return {Element} A <mutation> element with the current string count,
   *     or null if this block still has just its original two strings.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (this.itemCount_ === 2) {
      return null;
    }
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * @param {!Element} xmlElement Contains the number of strings.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var target = parseInt(xmlElement.getAttribute('items'), 10) || 2;
    this.updateJoinShape_(target);
  },

  /**
   * @param {number} targetCount Desired number of inputs.
   * @this Blockly.Block
   */
  updateJoinShape_: function(targetCount) {
    targetCount = Math.max(2, targetCount);
    while (this.itemCount_ > targetCount) {
      this.removeLastJoinItem_();
    }
    while (this.itemCount_ < targetCount) {
      this.appendJoinItem_();
    }
    this.updateJoinControlsVisibility_();
  },

  /**
   * @this Blockly.Block
   */
  appendJoinItem_: function() {
    this.itemCount_++;
    this.appendValueInput('STRING' + this.itemCount_);
    this.moveInputBefore('STRING' + this.itemCount_, 'JOIN_CONTROLS');
  },

  /**
   * Removes the most recently added string input. Any block plugged into
   * it is unplugged, not deleted. Never removes below the original two
   * strings.
   * @this Blockly.Block
   */
  removeLastJoinItem_: function() {
    if (this.itemCount_ <= 2) {
      return;
    }
    this.removeInput('STRING' + this.itemCount_);
    this.itemCount_--;
  },

  /**
   * @this Blockly.Block
   */
  updateJoinControlsVisibility_: function() {
    this.removeItemIcon_.setVisible(this.itemCount_ > 2);
  },

  /**
   * Click handler for the "+" button.
   * @this Blockly.Block
   */
  addJoinItem_: function() {
    Blockly.Constants.Operators.applyMutation_(this, function(block) {
      block.appendJoinItem_();
      block.updateJoinControlsVisibility_();
    });
  },

  /**
   * Click handler for the "-" button.
   * @this Blockly.Block
   */
  removeJoinItem_: function() {
    Blockly.Constants.Operators.applyMutation_(this, function(block) {
      block.removeLastJoinItem_();
      block.updateJoinControlsVisibility_();
    });
  }
};

Blockly.Extensions.registerMutator('operator_join_mutator',
    Blockly.Constants.Operators.EXPANDABLE_JOIN_MUTATOR_MIXIN,
    function() {
      this.setUpExpandableJoin_();
    });

Blockly.Blocks['operator_letter_of'] = {
  /**
   * Block for "letter _ of _" operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_LETTEROF,
      "args0": [
        {
          "type": "input_value",
          "name": "LETTER"
        },
        {
          "type": "input_value",
          "name": "STRING"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks['operator_length'] = {
  /**
   * Block for string length operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_LENGTH,
      "args0": [
        {
          "type": "input_value",
          "name": "STRING"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks['operator_contains'] = {
  /**
   * Block for _ contains _ operator
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_CONTAINS,
      "args0": [
        {
          "type": "input_value",
          "name": "STRING1"
        },
        {
          "type": "input_value",
          "name": "STRING2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_mod'] = {
  /**
   * Block for mod two numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_MOD,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_round'] = {
  /**
   * Block for rounding a numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_ROUND,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_mathop'] = {
  /**
   * Block for "advanced" math ops on a number.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_MATHOP,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OPERATOR",
          "options": [
            [Blockly.Msg.OPERATORS_MATHOP_ABS, 'abs'],
            [Blockly.Msg.OPERATORS_MATHOP_FLOOR, 'floor'],
            [Blockly.Msg.OPERATORS_MATHOP_CEILING, 'ceiling'],
            [Blockly.Msg.OPERATORS_MATHOP_SQRT, 'sqrt'],
            [Blockly.Msg.OPERATORS_MATHOP_SIN, 'sin'],
            [Blockly.Msg.OPERATORS_MATHOP_COS, 'cos'],
            [Blockly.Msg.OPERATORS_MATHOP_TAN, 'tan'],
            [Blockly.Msg.OPERATORS_MATHOP_ASIN, 'asin'],
            [Blockly.Msg.OPERATORS_MATHOP_ACOS, 'acos'],
            [Blockly.Msg.OPERATORS_MATHOP_ATAN, 'atan'],
            [Blockly.Msg.OPERATORS_MATHOP_LN, 'ln'],
            [Blockly.Msg.OPERATORS_MATHOP_LOG, 'log'],
            [Blockly.Msg.OPERATORS_MATHOP_EEXP, 'e ^'],
            [Blockly.Msg.OPERATORS_MATHOP_10EXP, '10 ^']
          ]
        },
        {
          "type": "input_value",
          "name": "NUM"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};
