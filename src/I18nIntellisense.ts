import { CompletionItemProvider, TextDocument, Position, CompletionItem, workspace, Range } from 'vscode';

export class I18nIntellisense implements CompletionItemProvider {

    constructor() {
    }

    // Provide auto-completion for key-paths
    provideCompletionItems(document: TextDocument, position: Position): Thenable<CompletionItem[]> {
        return Promise.resolve([new CompletionItem('Hello World')]);
    }

}
