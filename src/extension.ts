// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getTime, tipsStrArr } from "./utils";

let myStatusBarItem: vscode.StatusBarItem;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "rememberdrinkwater" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let drinkWaterInterval: any = null;
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  let startTime = Date.parse(String(new Date()));
  let disposable = vscode.commands.registerCommand(
    "rememberdrinkwater.startWork",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      if (drinkWaterInterval) {
        vscode.window.showInformationMessage("喝水小助手已经在运行了");
        return;
      }
      const iKnow: vscode.MessageItem = {
        title: "知道了",
      };
      drinkWaterInterval = setInterval(() => {
        const tempTime = new Date();
        const tempTimestamp = Date.parse(String(tempTime));
        const nowHours = tempTime.getHours();
        myStatusBarItem.text = getHoursMinutes(tempTimestamp - startTime);
        subscriptions.push(myStatusBarItem);
        if (tempTimestamp >= startTime +3600000) {
          startTime = tempTimestamp;
          const tipsStr =
            tipsStrArr[nowHours] ||
            "您好，我是您的“提醒喝水小助手”希望此刻看到消息的人可以和我一起来喝一杯水。及时排便洗手，记得关门。一小时后的我继续提醒您喝水，和我一起成为一天八杯水的人吧!";
          vscode.window.showInformationMessage(tipsStr, iKnow);
        }
      }, 1000);
      vscode.window.showInformationMessage(
        "喝水小助手开始计时，一小时后我会提醒您喝水"
      );
      myStatusBarItem.show();
    }
  );
  let disposable2 = vscode.commands.registerCommand(
    "rememberdrinkwater.stopWork",
    () => {
      clearInterval(drinkWaterInterval);
      drinkWaterInterval = null;
      vscode.window.showInformationMessage("喝水小助手已关闭");
      myStatusBarItem.hide();
    }
  );
  subscriptions.push(disposable);
  subscriptions.push(disposable2);
  subscriptions.push(myStatusBarItem);
}
function getHoursMinutes(nS: any) {
  const timeStr = new Date(nS);;
  const tempTime = new Date(timeStr);
  return `$(watch)${59 - tempTime.getMinutes()}:${60 - tempTime.getSeconds()}`;
}
// this method is called when your extension is deactivated
export function deactivate() {}
