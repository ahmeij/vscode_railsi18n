'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as glob from 'glob';

const config = vscode.workspace.getConfiguration( "railsi18n" );

function showi18nFiles(args):void {
  glob(config.include, {}, function(er, files) {
    console.log(files);
  });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(vscode.commands.registerCommand('railsi18n.showLocaleFiles', showi18nFiles));

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "railsi18n" is now active!');

    // create a decorator type that we use to decorate small numbers
    const i18nPresentDecorationType = vscode.window.createTextEditorDecorationType({
      borderWidth: '1px',
      borderStyle: 'solid',
      overviewRulerColor: 'blue',
      overviewRulerLane: vscode.OverviewRulerLane.Right,
      light: {
        // this color will be used in light color themes
        borderColor: 'darkblue'
      },
      dark: {
        // this color will be used in dark color themes
        borderColor: 'lightblue'
      }
    });


    let activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      triggerUpdateDecorations();
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
      activeEditor = editor;
      if (editor) {
        triggerUpdateDecorations();
      }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
      if (activeEditor && event.document === activeEditor.document) {
        triggerUpdateDecorations();
      }
    }, null, context.subscriptions);

    var timeout = null;
    function triggerUpdateDecorations() {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(updateDecorations, 500);
    }

    function updateDecorations() {
      if (!activeEditor) {
        return;
      }
      const regEx = /[\s\.](t\([^)]+\))/g;
      const text = activeEditor.document.getText();
      const i18nPresentDecorations: vscode.DecorationOptions[] = [];
      let match;
      while (match = regEx.exec(text)) {
        const startPos = activeEditor.document.positionAt(match.index);
        const endPos = activeEditor.document.positionAt(match.index + match[0].length);
        const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'i18n string' };
        i18nPresentDecorations.push(decoration);
      }
      activeEditor.setDecorations(i18nPresentDecorationType, i18nPresentDecorations);
    }

  }

// this method is called when your extension is deactivated
export function deactivate() {
}
