# vscode-npl README

NPL remote debugger for Paracraft applications. 

Contact author: lixizhi@yeah.net

## Features

- Press F11 in Paracraft to start NPL server, or enable debug="main" in the command line of Paracraft. 
- Right click in NPL/lua code and select "NPL Set Breakpoint Here" in the context menu. 


## Build & Deploy
```bash
git clone https://github.com/tatfook/vscode-npl.git
cd vscode-npl
npm install
```

### Publish the extension
Refer to [this](https://code.visualstudio.com/docs/extensions/publish-extension)
We need to register a token and create a publisher called `tatfook`.
```
npm install -g vsce
vsce package
vsce publish minor
```

### For more information

For greater debugging experience see also vscode-npldebugger extension or visual studio NPL extension

**Enjoy!**
