(function () {
  var htmlReplace = function (data) {
    var path = data.path.replace(/\\/g, "/");
    var container = document.querySelector(".markdown-body");
    var pathName = window.location.pathname;
    console.log("path", path);
    console.log("pathName", pathName);
    if (pathName === "/") {
      if (path === "/index.html") {
        container.innerHTML = data.content;
      }
    } else if (pathName === path) {
      container.innerHTML = data.content;
    }

    // bugfix: Modify file, code block style lost
    // ref: https://github.com/teadocs/teadocs/issues/28
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
  if ("WebSocket" in window) {
    var socket = io.connect(window.location.host);
    socket.on('news', function (data) {
      if (data.action === "hot-replace") {
        htmlReplace(data);
      } else if (data.action === "hot-refresh") {
        window.location.reload();
      }
    });
  }
})();
