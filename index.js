const fs = require("fs");
const glob = require("glob");
const clone = require("git-clone");
const rimraf = require("rimraf");

const gitUser = "odeimaiz"
const repo = "osparc-sample-studies"
const branch = "master";

const gitUrl = "https://github.com/" + gitUser + "/" + repo + ".git";
const gitRawUrlPrefix = "https://raw.githubusercontent.com/" + gitUser + "/" + repo + "/" + branch + "/";

const tempPath = "./" + gitUser;

clone(gitUrl, tempPath, {}, () => {
  glob(tempPath + "/*/project.json", {}, (err, prjFiles) => {
    if (err) {
      console.err(err);
      return;
    }
    console.log(prjFiles)
    prjFiles.forEach(prjFile => {
      const rawdata = fs.readFileSync(prjFile);
      const prjData = JSON.parse(rawdata);
      console.log(prjData["name"]);

      const fileUri = gitRawUrlPrefix + prjFile.replace(tempPath, "");
      console.log(encodeURI(fileUri));
      console.log("----------------");
    });

    rimraf(tempPath, () => console.log("temp dir removed"));
  });
});
