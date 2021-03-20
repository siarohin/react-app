const { run, runBumpHook } = require("./helpers");

run("git fetch"); // Avoid doing this twice to speed up hooks

runBumpHook("APP", "", [(ch) => !ch.startsWith("scripts/")]);
