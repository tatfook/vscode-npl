// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-npl.npl', () => {
		vscode.window.showInformationMessage('NPL remote debugger version 1.0 installed');
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('vscode-npl.setBreakPoint', () => {

		if (vscode.window.activeTextEditor) {
			let filename = vscode.window.activeTextEditor.document.fileName;
			let linenumber = vscode.window.activeTextEditor.selection.start.line
			linenumber = linenumber + 1;

			// TODO: shall we allow selecting port number?
			var baseUrl = "http://127.0.0.1:8099/";

			var Client = require('node-rest-client').Client;
			var client = new Client();
			var args = {
				data: {
					action: "addbreakpoint",
					filename: filename,
					line: String(linenumber)
				},
				headers: { "Content-Type": "application/json" },
				requestConfig: {
					timeout: 1000, //request timeout in milliseconds
					noDelay: true, //Enable/disable the Nagle algorithm
					keepAlive: true, //Enable/disable keep-alive functionalityidle socket.
					keepAliveDelay: 1000 //and optionally set the initial delay before the first keepalive probe is sent
				},
				responseConfig: {
					timeout: 1000, //request timeout in milliseconds
				},
			};
			var req = client.post(`${baseUrl}ajax/debugger`, args, function (data: any, response: any) {
				// inform user
				vscode.window.showInformationMessage(`Successfully set breakpoint at: ${linenumber}:${filename}`);
				vscode.env.openExternal(vscode.Uri.parse(`${baseUrl}debugger`));
			});
			var onTimeOut = function (result: any) {
				vscode.window.showInformationMessage(`Please start your NPL/Paracraft process first and start NPL Code Wiki at: http://127.0.0.1:8099/ \nDo you want to see help page?`, ...['ok', 'cancel']).then(selection => {
					if (selection == "ok") {
						vscode.env.openExternal(vscode.Uri.parse('https://github.com/LiXizhi/NPLRuntime/wiki/NPLCodeWiki'));
					}
				});
			}
			req.on('requestTimeout', onTimeOut);
			req.on('responseTimeout', onTimeOut);
			req.on('error', onTimeOut);
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
