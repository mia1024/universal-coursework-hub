# Grade: Browser Extension Module

This repository is a part of the [grade project](https://github.com/mia1024/grade). This module is currently written for, and tested on, Google Chrome and other Chromium-compatible browsers (Vivaldi, Edge, etc.). However, an effort has been made to make it compatible with Firefox as well, although untested. To compile the extension from source, run

```sh
git clone git@github.com:mia1024/grade-browser-extension.git
cd grade-browser-extension
npm i # if you have yarn installed, you probably want to run yarn install instead
npm run build
```

You can then find the compiled plugin at `dist/grade.zip`. To install it, navigate to `chrome://extensions/`
using a Chromium-based browser, toggle on the developer mode at top-right corner, and drag-and-drop the zip file 
into the page. 
