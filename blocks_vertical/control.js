/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
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

'use strict';

goog.provide('Blockly.Blocks.control');
goog.provide('Blockly.Constants.Control');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['control_forever'] = {
  /**
   * Block for repeat n times (external number).
   * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5eke39
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_forever",
      "message0": Blockly.Msg.CONTROL_FOREVER,
      "message1": "%1", // Statement
      "message2": "%1", // Icon
      "lastDummyAlign2": "RIGHT",
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_end"]
    });
  }
};

Blockly.Blocks['control_repeat'] = {
  /**
   * Block for repeat n times (external number).
   * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#so57n9
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_repeat",
      "message0": Blockly.Msg.CONTROL_REPEAT,
      "message1": "%1", // Statement
      "message2": "%1", // Icon
      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "input_value",
          "name": "TIMES"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_if'] = {
  /**
   * Block for if-then. Expandable: a control row at the bottom lets the
   * user add "else if" branches and/or a final "else" branch. Blocks saved
   * before this feature existed have no <mutation> and load with exactly
   * the original CONDITION/SUBSTACK shape, so this is fully backwards
   * compatible.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "type": "control_if",
      "message0": Blockly.Msg.CONTROL_IF,
      "message1": "%1", // Statement
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "mutator": "control_if_mutator",
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_if_else'] = {
  /**
   * Block for if-else. Expandable: a control row at the bottom lets the
   * user add extra "else if" branches before the final "else". Blocks
   * saved before this feature existed have no <mutation> and load with
   * exactly the original CONDITION/SUBSTACK/SUBSTACK2 shape, so this is
   * fully backwards compatible.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "type": "control_if_else",
      "message0": Blockly.Msg.CONTROL_IF,
      "message1": "%1",
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "mutator": "control_if_else_mutator",
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

/**
 * Mixin adding "else if" / "else" branches to control_if and
 * control_if_else. Shared by both blocks; control_if starts with no else
 * branch, control_if_else starts with one (created dynamically, in the
 * same way the "+ else" button creates one) so the same shape-management
 * code can be reused for both.
 * @mixin
 * @package
 */
Blockly.Constants.Control.EXPANDABLE_IF_MUTATOR_MIXIN = {
  /**
   * Set up the initial mutation state and append the control row with the
   * "+ else if" / "+ else" / "-" buttons.
   * @param {boolean} hasElseByDefault Whether this block starts out with an
   *     else branch (true for control_if_else, false for control_if).
   * @this Blockly.Block
   * @package
   */
  setUpExpandableIf_: function(hasElseByDefault) {
    this.elseifCount_ = 0;
    this.hasElse_ = false;
    this.hasElseByDefault_ = hasElseByDefault;

    this.appendDummyInput('IF_CONTROLS').setAlign(Blockly.ALIGN_RIGHT);
    this.addElseIfIcon_ = new Blockly.FieldMutatorIcon(
        '+ else if', 'addElseIfBranch_', 'blocklyMutatorIconText blocklyMutatorIconAdd');
    this.addElseIcon_ = new Blockly.FieldMutatorIcon(
        '+ else', 'addElseBranch_', 'blocklyMutatorIconText blocklyMutatorIconAdd');
    this.removeBranchIcon_ = new Blockly.FieldMutatorIcon(
        '-', 'removeLastBranch_', 'blocklyMutatorIconText blocklyMutatorIconRemove');
    this.getInput('IF_CONTROLS')
        .appendField(this.addElseIfIcon_, 'ADD_ELSEIF')
        .appendField(this.addElseIcon_, 'ADD_ELSE')
        .appendField(this.removeBranchIcon_, 'REMOVE_BRANCH');

    if (hasElseByDefault) {
      this.appendElseBranch_();
    }
    this.updateIfControlsVisibility_();
  },

  /**
   * @return {Element} A <mutation> element reflecting the current number of
   *     "else if" branches and whether an "else" branch is present, or null
   *     if this block is in its default (never-expanded) shape so that
   *     unmodified blocks serialize exactly as they did before this
   *     feature existed.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var isDefaultShape = this.elseifCount_ === 0 &&
        this.hasElse_ === this.hasElseByDefault_;
    if (isDefaultShape) {
      return null;
    }
    var container = document.createElement('mutation');
    container.setAttribute('elseif', this.elseifCount_);
    container.setAttribute('else', this.hasElse_ ? 1 : 0);
    return container;
  },

  /**
   * @param {!Element} xmlElement Contains the number of "else if" branches
   *     and whether an "else" branch is present.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var targetElseifCount =
        parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
    var targetHasElse = xmlElement.getAttribute('else') == 1;
    this.updateIfShape_(targetElseifCount, targetHasElse);
  },

  /**
   * Reconciles the block's inputs with the desired number of "else if"
   * branches and whether an "else" branch should be present, preserving
   * any blocks already connected to branches that remain.
   * @param {number} targetElseifCount Desired number of "else if" branches.
   * @param {boolean} targetHasElse Whether an "else" branch should exist.
   * @this Blockly.Block
   */
  updateIfShape_: function(targetElseifCount, targetHasElse) {
    targetElseifCount = Math.max(0, targetElseifCount);
    while (this.elseifCount_ > targetElseifCount) {
      this.removeLastElseIfBranch_();
    }
    while (this.elseifCount_ < targetElseifCount) {
      this.appendElseIfBranch_();
    }
    if (targetHasElse && !this.hasElse_) {
      this.appendElseBranch_();
    } else if (!targetHasElse && this.hasElse_) {
      this.removeElseBranch_();
    }
    this.updateIfControlsVisibility_();
  },

  /**
   * Appends one more "else if <condition> then" branch, just above the
   * control row. CONTROL_ELSEIF is a message with a %1 placeholder (like
   * CONTROL_IF's "if %1 then"); since this input is built by hand rather
   * than through jsonInit's own message interpolation, the text before and
   * after the placeholder is split out manually and attached the same way
   * jsonInit would: the leading text on the condition input itself, and any
   * trailing text ("then") on a following dummy input that shares its row.
   * @this Blockly.Block
   */
  appendElseIfBranch_: function() {
    this.elseifCount_++;
    var n = this.elseifCount_;
    var message = Blockly.Msg.CONTROL_ELSEIF || 'else if %1 then';
    var parts = message.split('%1');
    var beforeText = parts[0] ? parts[0].trim() : '';
    var afterText = parts[1] ? parts[1].trim() : '';
    this.appendValueInput('ELSEIF_CONDITION' + n)
        .setCheck('Boolean')
        .appendField(beforeText);
    if (afterText) {
      this.appendDummyInput('ELSEIF_THEN' + n).appendField(afterText);
    }
    this.appendStatementInput('ELSEIF_SUBSTACK' + n);
    // Each moveInputBefore lands its input immediately in front of
    // IF_CONTROLS, i.e. immediately after whatever was moved there just
    // before it - so these must run in the same order the inputs should
    // visually appear.
    this.moveInputBefore('ELSEIF_CONDITION' + n, 'IF_CONTROLS');
    if (afterText) {
      this.moveInputBefore('ELSEIF_THEN' + n, 'IF_CONTROLS');
    }
    this.moveInputBefore('ELSEIF_SUBSTACK' + n, 'IF_CONTROLS');
  },

  /**
   * Removes the most recently added "else if" branch. Any block plugged
   * into its statement or condition input is unplugged, not deleted.
   * @this Blockly.Block
   */
  removeLastElseIfBranch_: function() {
    if (this.elseifCount_ <= 0) {
      return;
    }
    var n = this.elseifCount_;
    this.removeInput('ELSEIF_CONDITION' + n);
    this.removeInput('ELSEIF_THEN' + n, true);
    this.removeInput('ELSEIF_SUBSTACK' + n);
    this.elseifCount_--;
  },

  /**
   * Appends the trailing "else" branch, just above the control row.
   * @this Blockly.Block
   */
  appendElseBranch_: function() {
    this.hasElse_ = true;
    this.appendDummyInput('ELSE_LABEL').appendField(Blockly.Msg.CONTROL_ELSE);
    this.appendStatementInput('SUBSTACK2');
    this.moveInputBefore('ELSE_LABEL', 'IF_CONTROLS');
    this.moveInputBefore('SUBSTACK2', 'IF_CONTROLS');
  },

  /**
   * Removes the trailing "else" branch. Any block plugged into its
   * statement input is unplugged, not deleted.
   * @this Blockly.Block
   */
  removeElseBranch_: function() {
    if (!this.hasElse_) {
      return;
    }
    this.removeInput('ELSE_LABEL');
    this.removeInput('SUBSTACK2');
    this.hasElse_ = false;
  },

  /**
   * Shows/hides the "+ else if", "+ else" and "-" buttons depending on the
   * current shape: once an "else" branch exists nothing more can be added
   * after it, and the "-" button only appears once there is something to
   * remove.
   * @this Blockly.Block
   */
  updateIfControlsVisibility_: function() {
    this.addElseIfIcon_.setVisible(!this.hasElse_);
    this.addElseIcon_.setVisible(!this.hasElse_);
    this.removeBranchIcon_.setVisible(this.hasElse_ || this.elseifCount_ > 0);
  },

  /**
   * Click handler for the "+ else if" button.
   * @this Blockly.Block
   */
  addElseIfBranch_: function() {
    Blockly.Constants.Control.applyIfMutation_(this, function(block) {
      block.appendElseIfBranch_();
    });
  },

  /**
   * Click handler for the "+ else" button.
   * @this Blockly.Block
   */
  addElseBranch_: function() {
    Blockly.Constants.Control.applyIfMutation_(this, function(block) {
      block.appendElseBranch_();
      block.updateIfControlsVisibility_();
    });
  },

  /**
   * Click handler for the "-" button: removes the "else" branch if one is
   * present, otherwise removes the most recently added "else if" branch.
   * @this Blockly.Block
   */
  removeLastBranch_: function() {
    Blockly.Constants.Control.applyIfMutation_(this, function(block) {
      if (block.hasElse_) {
        block.removeElseBranch_();
      } else {
        block.removeLastElseIfBranch_();
      }
      block.updateIfControlsVisibility_();
    });
  }
};

/**
 * Applies a shape-changing function to an expandable if/if-else block,
 * updating its control button visibility, re-rendering it, and firing a
 * 'mutation' change event if the shape actually changed (so this is
 * undoable, matching how Blockly.Mutator drag-and-drop mutations behave).
 * @param {!Blockly.Block} block The block to mutate.
 * @param {function(!Blockly.Block)} mutateFn Callback that performs the
 *     actual shape change.
 * @private
 */
Blockly.Constants.Control.applyIfMutation_ = function(block, mutateFn) {
  var oldMutationDom = block.mutationToDom();
  var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
  mutateFn(block);
  block.updateIfControlsVisibility_();
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

Blockly.Extensions.registerMutator('control_if_mutator',
    Blockly.Constants.Control.EXPANDABLE_IF_MUTATOR_MIXIN,
    function() {
      this.setUpExpandableIf_(false);
    });

Blockly.Extensions.registerMutator('control_if_else_mutator',
    Blockly.Constants.Control.EXPANDABLE_IF_MUTATOR_MIXIN,
    function() {
      this.setUpExpandableIf_(true);
    });

Blockly.Blocks['control_stop'] = {
  /**
   * Block for stop all scripts.
   * @this Blockly.Block
   */
  init: function() {
    var ALL_SCRIPTS = 'all';
    var THIS_SCRIPT = 'this script';
    var OTHER_SCRIPTS = 'other scripts in sprite';
    var stopDropdown = new Blockly.FieldDropdown(function() {
      if (this.sourceBlock_ &&
          this.sourceBlock_.nextConnection &&
          this.sourceBlock_.nextConnection.isConnected()) {
        return [
          [Blockly.Msg.CONTROL_STOP_OTHER, OTHER_SCRIPTS]
        ];
      }
      return [[Blockly.Msg.CONTROL_STOP_ALL, ALL_SCRIPTS],
        [Blockly.Msg.CONTROL_STOP_THIS, THIS_SCRIPT],
        [Blockly.Msg.CONTROL_STOP_OTHER, OTHER_SCRIPTS]
      ];
    }, function(option) {
      // Create an event group to keep field value and mutator in sync
      // Return null at the end because setValue is called here already.
      Blockly.Events.setGroup(true);
      var oldMutation = Blockly.Xml.domToText(this.sourceBlock_.mutationToDom());
      this.sourceBlock_.setNextStatement(option == OTHER_SCRIPTS);
      var newMutation = Blockly.Xml.domToText(this.sourceBlock_.mutationToDom());
      Blockly.Events.fire(new Blockly.Events.BlockChange(this.sourceBlock_,
          'mutation', null, oldMutation, newMutation));
      this.setValue(option);
      Blockly.Events.setGroup(false);
      return null;
    });
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROL_STOP)
        .appendField(stopDropdown, 'STOP_OPTION');
    this.setCategory(Blockly.Categories.control);
    this.setColour(Blockly.Colours.control.primary,
        Blockly.Colours.control.secondary,
        Blockly.Colours.control.tertiary,
        Blockly.Colours.control.quaternary
    );
    this.setPreviousStatement(true);
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('hasnext', this.nextConnection != null);
    return container;
  },
  domToMutation: function(xmlElement) {
    var hasNext = (xmlElement.getAttribute('hasnext') == 'true');
    this.setNextStatement(hasNext);
  }
};

Blockly.Blocks['control_wait'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_wait",
      "message0": Blockly.Msg.CONTROL_WAIT,
      "args0": [
        {
          "type": "input_value",
          "name": "DURATION"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_wait_until'] = {
  /**
   * Block to wait until a condition becomes true.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_WAITUNTIL,
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_repeat_until'] = {
  /**
   * Block to repeat until a condition becomes true.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_REPEATUNTIL,
      "message1": "%1",
      "message2": "%1",
      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_while'] = {
  /**
   * Block to repeat until a condition becomes false.
   * (This is an obsolete "hacked" block, for compatibility with 2.0.)
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_WHILE,
      "message1": "%1",
      "message2": "%1",
      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_for_each'] = {
  /**
   * Block for for-each. This is an obsolete block that is implemented for
   * compatibility with Scratch 2.0 projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "type": "control_for_each",
      "message0": Blockly.Msg.CONTROL_FOREACH,
      "message1": "%1",
      "args0": [
        {
          "type": "field_variable",
          "name": "VARIABLE"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_start_as_clone'] = {
  /**
   * Block for "when I start as a clone" hat.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_start_as_clone",
      "message0": Blockly.Msg.CONTROL_STARTASCLONE,
      "args0": [
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_hat"]
    });
  }
};

Blockly.Blocks['control_create_clone_of_menu'] = {
  /**
   * Create-clone drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "CLONE_OPTION",
          "options": [
            [Blockly.Msg.CONTROL_CREATECLONEOF_MYSELF, '_myself_']
          ]
        }
      ],
      "extensions": ["colours_control", "output_string"]
    });
  }
};

Blockly.Blocks['control_create_clone_of'] = {
  /**
   * Block for "create clone of..."
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_start_as_clone",
      "message0": Blockly.Msg.CONTROL_CREATECLONEOF,
      "args0": [
        {
          "type": "input_value",
          "name": "CLONE_OPTION"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_delete_this_clone'] = {
  /**
   * Block for "delete this clone."
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_DELETETHISCLONE,
      "args0": [
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_end"]
    });
  }
};

Blockly.Blocks['control_get_counter'] = {
  /**
   * Block to get the counter value. This is an obsolete block that is
   * implemented for compatibility with Scratch 2.0 projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_COUNTER,
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "output_number"]
    });
  }
};

Blockly.Blocks['control_incr_counter'] = {
  /**
   * Block to add one to the counter value. This is an obsolete block that is
   * implemented for compatibility with Scratch 2.0 projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_INCRCOUNTER,
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_clear_counter'] = {
  /**
   * Block to clear the counter value. This is an obsolete block that is
   * implemented for compatibility with Scratch 2.0 projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_CLEARCOUNTER,
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_all_at_once'] = {
  /**
   * Block to run the contained script. This is an obsolete block that is
   * implemented for compatibility with Scratch 2.0 projects. Note that
   * this was originally designed to run all of the contained blocks
   * (sequentially, like normal) within a single frame, but this feature
   * was removed in place of custom blocks marked "run without screen
   * refresh". The "all at once" block was changed to run the contained
   * blocks ordinarily, functioning the same way as an "if" block with a
   * reporter that is always true (e.g. "if 1 = 1"). Also note that the
   * Scratch 2.0 spec for this block is "warpSpeed", but the label shows
   * "all at once".
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_ALLATONCE,
      "message1": "%1", // Statement
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};
