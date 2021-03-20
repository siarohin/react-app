const { resolve } = require("path");
const fs = require("fs");
const shell = require("shelljs");

/**
 * Execute console command, return the stdout result.
 */
const run = (command) => {
  console.log(`> ${command}`);
  return shell.exec(command);
};

/**
 * Returns true if there are any staged changes that match the predicates provided, false otherwise.
 */
const hasMatchingStagedChanges = (predicates) => {
  const stdout = run("git diff HEAD --staged --name-only");
  let changedFiles = stdout.split("\n").filter((line) => line);
  predicates.forEach((predicate) => (changedFiles = changedFiles.filter(predicate)));
  return changedFiles.length > 0;
};

/**
 * Get the version from local copy for the specified package.json file.
 */
const getLocalVersion = (targetFile) => {
  const path = resolve(__dirname, "../", targetFile);
  const file = fs.readFileSync(path, "utf8");
  return JSON.parse(file).version;
};

/**
 * Get the version from git origin for the specified package.json file.
 * Expect to have git fetch already executed.
 */
const getOriginVersion = (targetFile) => {
  const file = run(`git show origin/master:${targetFile}`);
  return JSON.parse(file).version;
};

/**
 * Returns 1 if ver1>ver2, -1 if ver1<ver2, 0 otherwise.
 */
const compareVersions = (ver1, ver2) => {
  const v1 = ver1.split(".");
  const v2 = ver2.split(".");
  for (let i = 0; i < 3; i++) {
    if (v1[i] > v2[i]) {
      return 1;
    }
    if (v1[i] < v2[i]) {
      return -1;
    }
  }
  return 0;
};

/**
 * Increments the patch part of the provided version string and returns the result.
 * @example "1.0.3" -> "1.0.4"
 */
const bumpPatchVersion = (version) => {
  const numbers = version.split(".");
  numbers[2]++;
  return numbers.join(".");
};

/**
 * Overwrites the specified package.json file with a version provided.
 */
const writeNewVersion = (targetFile, newVersion) => {
  const path = resolve(__dirname, "../", targetFile);
  const file = fs.readFileSync(path, "utf8");
  // Don't do JSON.parse since package-lock.json files could be huge:
  const updatedContent = file.replace(/"version": ".+"/, `"version": "${newVersion}"`);
  fs.writeFileSync(path, updatedContent);
};

/**
 * Executes patch version bump if following checks passed:
 * 1. Any committed file name/path matches changePredicates provided.
 * 2. Local version is older or equal a version in master.
 */
const runBumpHook = (moduleName, pathPrefix, changePredicates) => {
  console.log(`${moduleName} VERSION BUMP HOOK START`);

  const packageJson = `${pathPrefix}package.json`;
  const packageLockJson = `${pathPrefix}package-lock.json`;

  if (hasMatchingStagedChanges(changePredicates)) {
    const origin = getOriginVersion(packageJson);
    const local = getLocalVersion(packageJson);

    if (compareVersions(origin, local) >= 0) {
      const version = bumpPatchVersion(origin);

      console.log(`Bumping ${moduleName} version to ${version}`);
      writeNewVersion(packageJson, version);
      writeNewVersion(packageLockJson, version);
      run(`git add ${packageJson} ${packageLockJson} -u`);
    } else {
      console.log("Local copy already has newer version - no bump needed");
    }
  } else {
    console.log("No changes in APP - no bump needed");
  }

  console.log(`${moduleName} VERSION BUMP HOOK END`);
};

exports.run = run;
exports.runBumpHook = runBumpHook;
