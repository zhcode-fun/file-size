const vscode = require("vscode");
const fs = require("fs");
const workspace = vscode.workspace;
const window = vscode.window;
const eventCollection = {};

function getStatusBar() {
  const configuration = workspace.getConfiguration("file-size");
  eventCollection.statusBar = window.createStatusBarItem(
    configuration.get("position") === "left"
      ? vscode.StatusBarAlignment.Left
      : vscode.StatusBarAlignment.Right,
    configuration.get("priority")
  );
  eventCollection.statusBar.show();
}

/**
 * @param {Number} size filesize
 */
function sizeConvert(size) {
  if (size >= 1048576) return `${Math.floor(size / 10485.76) / 100} MB`;
  else if (size >= 1024) return `${Math.floor(size / 10.24) / 100} KB`;
  else return `${size} B`;
}

/**
 * @param {import('vscode').TextDocument} doc
 */
function updateSize(doc) {
  const size = fs.statSync(doc.fileName).size;
  const sizeMan = sizeConvert(size);
  eventCollection.statusBar.text = sizeMan;
}

function activate() {
  getStatusBar();
  const activeTextEditor = window.activeTextEditor;
  activeTextEditor && updateSize(activeTextEditor.document);
  eventCollection.saveTextDocument = workspace.onDidSaveTextDocument((doc) => {
    const activeTextEditor = window.activeTextEditor;
    if (
      activeTextEditor &&
      activeTextEditor.document.fileName === doc.fileName
    ) {
      updateSize(activeTextEditor.document);
    }
  });
  eventCollection.changeActiveTextEditor = window.onDidChangeActiveTextEditor(
    (textEditor) => {
      if (textEditor) {
        updateSize(textEditor.document);
      } else {
        eventCollection.statusBar.text = "";
      }
    }
  );
  eventCollection.changeConfiguration = workspace.onDidChangeConfiguration(
    () => {
      eventCollection.statusBar.dispose();
      getStatusBar();
      const activeTextEditor = window.activeTextEditor;
      activeTextEditor && updateSize(activeTextEditor.document);
    }
  );
}

exports.activate = activate;

function deactivate() {
  eventCollection.saveTextDocument &&
    eventCollection.saveTextDocument.dispose();
  eventCollection.changeActiveTextEditor &&
    eventCollection.changeActiveTextEditor.dispose();
  eventCollection.changeConfiguration &&
    eventCollection.changeConfiguration.dispose();
  eventCollection.statusBar.dispose();
}

module.exports = {
  activate,
  deactivate,
};
