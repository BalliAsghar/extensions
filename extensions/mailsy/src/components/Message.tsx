import type { ReactElement } from "react";
import { useCallback } from "react";
import { Action, ActionPanel, Color, Detail, Icon } from "@raycast/api";
import { useAccount } from "../hooks/useAccount";
import { getMessage, getMessageFilePath } from "../libs/api";
import { htmlToMarkdown } from "../libs/utils";

type MessageProps = {
  messageId: string;
};

export function Message({ messageId }: MessageProps): ReactElement {
  const fetchMessage = useCallback(() => getMessage(messageId), [messageId]);
  const { data: message, isLoading } = useAccount(fetchMessage);

  if (!message) {
    return <></>;
  }

  const path = getMessageFilePath(messageId);
  const navigationTitle = message.subject || "No Subject";
  const markdownContent = message.html?.[0] ? htmlToMarkdown(message.html[0]) : "# No Content";

  return (
    <Detail
      navigationTitle={navigationTitle}
      markdown={markdownContent}
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            title="Open in Browser"
            url={path}
            icon={{ source: Icon.Globe, tintColor: Color.Blue }}
          />
        </ActionPanel>
      }
    />
  );
}
