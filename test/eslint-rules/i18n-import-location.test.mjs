import { RuleTester } from "eslint";
import rule from "../../lint-configs/eslint-rules/i18n-import-location.mjs";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: "module" },
});

ruleTester.run("no-i18n-import", rule, {
  valid: [
    {
      code: "import { i18n } from 'discourse-i18n';",
    },
  ],
  invalid: [
    {
      code: "import { i18n } from 'i18n';",
      errors: [
        {
          message:
            "Import from 'i18n' is not allowed. Use 'discourse-i18n' instead.",
        },
      ],
      output: "import { i18n } from 'discourse-i18n';",
    },
    {
      code: "import i18n from 'discourse-common/helpers/i18n';",
      errors: [
        {
          message:
            "Import from 'discourse-common/helpers/i18n' is not allowed. Use 'discourse-i18n' instead.",
        },
      ],
      output: "import { i18n } from 'discourse-i18n';",
    },
  ],
});