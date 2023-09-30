const vscode = require("vscode");

const name = "firstComment";

module.exports = (achList, updateAchList) => {
  if (achList.includes(name)) return;

  const disposable = vscode.workspace.onDidChangeTextDocument((event) => {
    const { document } = event;
    if (!document) return;

    // Check if the document is a code file (based on languageId)
    if (isCodeFile(document.languageId)) {
      const text = document.getText();

      // Check if the code contains comments
      if (containsComments(text, document.languageId)) {
        vscode.window.showInformationMessage("🏆Achievement Unlocked🔓: Writing comments with code !!! nice📝");
        updateAchList(name);
        disposable.dispose();
      }
    }
  });
};

function isCodeFile(languageId) {
  // Specify the supported file types by their language identifiers
  const supportedLanguages = ["javascript", "typescript", "python", "java", "c", "cpp", "rust", "go", "html", "css"];
  return supportedLanguages.includes(languageId);
}

function containsComments(text, languageId) {
  // Define regular expressions to detect comments in each supported language
  const commentRegexMap = {
    javascript: /\/\/|\/\*[\s\S]*?\*\//,
    typescript: /\/\/|\/\*[\s\S]*?\*\//,
    python: /#|'''.*?'''|""".*?"""/,
    java: /\/\/|\/\*[\s\S]*?\*\//,
    c: /\/\/|\/\*[\s\S]*?\*\//,
    cpp: /\/\/|\/\*[\s\S]*?\*\//,
    rust: /\/\/|\/\*[\s\S]*?\*\//,
    go: /\/\/|\/\*[\s\S]*?\*\//,
    html: /<!--[\s\S]*?-->|\/\*[\s\S]*?\*\//,
    css: /\/\*[\s\S]*?\*\//,
  };

  // Use the appropriate regex for the given languageId
  const commentRegex = commentRegexMap[languageId];

  if (!commentRegex) {
    // Unsupported language, return false
    return false;
  }

  return commentRegex.test(text);
}