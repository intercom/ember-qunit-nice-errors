/* eslint-env node */
'use strict';

var BroccoliDebug = require('broccoli-debug');
var TestTransformFilter = require('./lib/tests-transform-filter');

module.exports = {
  name: 'ember-qunit-nice-errors',

  init() {
    this._super.init && this._super.init.apply(this, arguments);
    this.debugTree = BroccoliDebug.buildDebugCallback('ember-qunit-nice-errors');
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    this.addonConfig =
      app.project.config(app.env)['ember-qunit-nice-errors'] || {};
  },

  preprocessTree: function(type, tree) {
    if (type === 'test') {
      var inputTree = this.debugTree(tree, 'input');
      var processedTree = new TestTransformFilter(tree, this.addonConfig);
      var outputTree = this.debugTree(processedTree, 'output');
      return processedTree;
    }
    return tree;
  }
};
