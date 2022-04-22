import CodeMirror from "codemirror";

CodeMirror.defineMode("customHighlights", (config) => {
  const overlay = {
    token: (stream) => {
      if (stream.match(/\*/)) {
        return "md-strong";
      }
      if (stream.match(/#/)) {
        return "md-heading-prefix";
      } else {
        stream.next();
        return null;
      }
    },
  };

  return CodeMirror.overlayMode(
    CodeMirror.getMode(config, "text/x-markdown"),
    overlay,
    true
  );
});
