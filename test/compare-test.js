import { execSync } from "node:child_process";
import console, { log } from "node:console";
import { readFileSync } from "node:fs";
import process, { chdir, stdout } from "node:process";

const expectedEslintOutput = `
/path-prefix/my-component.gjs
   1:1  error  Run autofix to sort these imports!                                        simple-import-sort/imports
  16:4  error  Expected property currentUser to come before property __GLIMMER_TEMPLATE  sort-class-members/sort-class-members

✖ 2 problems (2 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the \`--fix\` option.
`;

const expectedTemplateLintOutput = `
my-component.gjs
  13:4  error  Unexpected {{log}} usage.  no-log

✖ 1 problems (1 errors, 0 warnings)
`;

function eslint() {
  stdout.write("eslint... ");

  let actual;
  try {
    actual = execSync("pnpm eslint my-component.gjs").toString();
  } catch (e) {
    actual = e.stdout.toString();
    actual = actual.replace(/^\/.+\/test-(esm|cjs)\//m, "/path-prefix/");
  }

  if (expectedEslintOutput.trim() === actual.trim()) {
    console.log("ok");
  } else {
    process.exitCode = 1;
    console.error(
      `failed\n\nexpected:\n${expectedEslintOutput}\nactual:\n${actual}`,
    );
  }
}

function prettier() {
  stdout.write("prettier... ");

  const expected = readFileSync("formatted-my-component.gjs", "utf8");
  let actual;

  try {
    actual = execSync(
      "cat my-component.gjs | pnpm prettier --stdin-filepath=my-component.gjs",
    ).toString();
  } catch (e) {
    actual = e.stdout.toString();
  }

  if (expected.trim() === actual.trim()) {
    console.log("ok");
  } else {
    process.exitCode = 1;
    console.error(`failed\n\nexpected:\n${expected}\nactual:\n${actual}`);
  }
}

function templateLint() {
  stdout.write("ember-template-lint... ");

  let actual;
  try {
    actual = execSync("pnpm ember-template-lint my-component.gjs").toString();
  } catch (e) {
    actual = e.stdout.toString();
  }

  if (expectedTemplateLintOutput.trim() === actual.trim()) {
    console.log("ok");
  } else {
    process.exitCode = 1;
    console.error(
      `failed\n\nexpected:\n${expectedTemplateLintOutput}\nactual:\n${actual}`,
    );
  }
}

log("esm:");
chdir("../test-esm");
eslint();
prettier();
templateLint();

log("cjs:");
chdir("../test-cjs");
eslint();
prettier();
templateLint();
