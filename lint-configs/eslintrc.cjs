"use strict";

/* eslint-env node */

module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    builtin: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    requireConfigFile: false,
    babelOptions: {
      plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
    },
  },
  plugins: [
    "ember",
    "sort-class-members",
    "decorator-position",
    "simple-import-sort",
  ],
  globals: {
    _: "off",
    $: "readonly",
    acceptance: "off",
    asyncRender: "off",
    Blob: "readonly",
    bootbox: "off",
    click: "off",
    count: "off",
    currentPath: "off",
    currentRouteName: "off",
    currentURL: "off",
    currentUser: "off",
    define: "readonly",
    Discourse: "off",
    Ember: "off",
    exists: "off",
    File: "readonly",
    fillIn: "off",
    find: "off",
    getSettledState: "off",
    globalThis: "readonly",
    hasModule: "off",
    invisible: "off",
    jQuery: "off",
    keyboardHelper: "off",
    keyEvent: "off",
    moduleFor: "off",
    moment: "readonly",
    pauseTest: "readonly",
    Pretender: "off",
    Promise: "readonly",
    query: "off",
    queryAll: "off",
    QUnit: "off",
    require: "readonly",
    requirejs: "readonly",
    sandbox: "off",
    sinon: "off",
    test: "off",
    testDone: "off",
    testStart: "off",
    triggerEvent: "off",
    visible: "off",
    visit: "off",
    waitUntil: "off",
  },
  rules: {
    "block-scoped-var": 2,
    "dot-notation": 0,
    eqeqeq: [2, "allow-null"],
    "guard-for-in": 2,
    "no-alert": 2,
    "no-bitwise": 2,
    "no-caller": 2,
    "no-cond-assign": 0,
    "no-console": 2,
    "no-debugger": 2,
    "no-empty": 0,
    "no-eval": 2,
    "no-extend-native": 2,
    "no-extra-parens": 0,
    "no-inner-declarations": 2,
    "no-irregular-whitespace": 2,
    "no-iterator": 2,
    "no-loop-func": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-multi-str": 2,
    "no-new": 2,
    "no-plusplus": 0,
    "no-proto": 2,
    "no-script-url": 2,
    "no-sequences": 2,
    "no-shadow": 2,
    "no-this-before-super": 2,
    "no-trailing-spaces": 2,
    "no-undef": 2,
    "no-unused-vars": 2,
    "no-with": 2,
    "no-var": 2,
    radix: 2,
    semi: 2,
    strict: 0,
    "valid-typeof": 2,
    "wrap-iife": [2, "inside"],
    curly: 2,
    "no-duplicate-imports": 2,
    "object-shorthand": ["error", "properties"],
    "no-dupe-class-members": 2,
    "ember/no-attrs-in-components": "error",
    "ember/no-attrs-snapshot": "error",
    "ember/no-arrow-function-computed-properties": "off",
    "ember/no-assignment-of-untracked-properties-used-in-tracking-contexts":
      "off",
    "ember/no-duplicate-dependent-keys": "error",
    "ember/no-side-effects": "off",
    "ember/no-volatile-computed-properties": "error",
    "ember/require-return-from-computed": "off",
    "ember/avoid-using-needs-in-controllers": "error",
    "ember/new-module-imports": "error",
    "ember/no-deprecated-router-transition-methods": "error",
    "ember/no-function-prototype-extensions": "error",
    "ember/no-string-prototype-extensions": "error",
    "ember/avoid-leaking-state-in-ember-objects": "off",
    "ember/no-get": "off",
    "ember/no-observers": "off",
    "ember/no-mixins": "off",
    "ember/no-new-mixins": "off",
    "ember/no-implicit-injections": "off",
    "ember/no-array-prototype-extensions": "off",
    "ember/no-array-prototype-extensions": "off",
    "ember/no-try-invoke": "error",
    "ember/require-super-in-lifecycle-hooks": "error",
    "ember/classic-decorator-hooks": "off",
    "ember/no-actions-hash": "off",
    "ember/no-classic-classes": "off",
    "ember/no-ember-super-in-es-classes": "error",
    "ember/no-empty-glimmer-component-classes": "error",
    "ember/no-global-jquery": "error",
    "ember/no-jquery": "off",
    "ember/no-incorrect-calls-with-inline-anonymous-functions": "error",
    "ember/no-invalid-debug-function-arguments": "error",
    "ember/no-capital-letters-in-routes": "off",
    "ember/no-controller-access-in-routes": "off",
    "ember/no-private-routing-service": "error",
    "ember/no-shadow-route-definition": "error",
    "ember/no-unnecessary-index-route": "error",
    "ember/no-unnecessary-route-path-option": "error",
    "ember/route-path-style": "off",
    "ember/routes-segments-snake-case": "error",
    "ember/no-pause-test": "error",
    "ember/no-replace-test-comments": "error",
    "ember/no-settled-after-test-helper": "error",
    "ember/prefer-ember-test-helpers": "error",
    "ember/require-valid-css-selector-in-test-helpers": "error",
    "sort-class-members/sort-class-members": [
      2,
      {
        order: [
          "[static-properties]",
          "[static-methods]",
          "[injected-services]",
          "[injected-controllers]",
          "[tracked-properties]",
          "[properties]",
          "[private-properties]",
          "constructor",
          "[everything-else]",
          "[template-tag]",
        ],
        groups: {
          // https://github.com/ember-cli/eslint-plugin-ember/issues/1896
          // This only sort of works: in addition to the issues mentioned
          // above, it doesn't seem to reliably enforce the order, e.g.
          // [injected-services] -> <template> -> [injected-services]
          // doesn't seem to trigger the error. That being said, it does
          // work sometimes and this is needed to avoid emitting errors
          // in the limited cases where it does work.
          "template-tag": [{ type: "property", name: `/__GLIMMER_TEMPLATE/` }],
          "injected-services": [
            { groupByDecorator: "service", type: "property" },
          ],
          "injected-controllers": [
            { groupByDecorator: "controller", type: "property" },
          ],
          "tracked-properties": [
            { groupByDecorator: "tracked", type: "property" },
          ],
          "private-properties": [
            { type: "property", private: true },
            { type: "property", name: "/_.+/" },
          ],
        },
        accessorPairPositioning: "getThenSet",
        stopAfterFirstProblem: false,
      },
    ],
    "decorator-position/decorator-position": ["error", { printWidth: 80 }],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          [
            // Ember/glimmer
            "^@glimmer/",
            "^@ember/",
            // Any other packages ('longest match wins')
            "",
            // Internal
            "^discourse/",
            "^discourse-common/",
            "^discourse-.+",
            "^admin/",
            "^wizard/",
            "^I18n$",
            "^select-kit/",
            "^float-kit/",
            "^truth-helpers/",
            // Plugins
            "^discourse/plugins/",
            // Relative
            "^\\.\\./",
            "^\\./",
          ],
        ],
      },
    ],
  },

  // https://github.com/ember-cli/eslint-plugin-ember/issues/1895
  // We may eventually be able to drop this by extending the base
  // config from eslint-plugin-ember. In the meantime, this
  overrides: [
    {
      files: ["**/*.gjs", "**/*.gts"],
      processor: "ember/<template>",
      globals: {
        [TEMPLATE_TAG_PLACEHOLDER]: "readonly",
      },
    },
  ],
};
