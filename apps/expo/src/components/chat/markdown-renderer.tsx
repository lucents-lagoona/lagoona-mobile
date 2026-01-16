import React from "react";
import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

interface MarkdownRendererProps {
  content: string;
}

const createMarkdownStyles = () => {
  return StyleSheet.create({
    body: {
      fontSize: 16,
      fontFamily: "System",
      lineHeight: 26,
    },
    heading1: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 12,
      marginTop: 12,
      fontFamily: "PlayfairDisplay_700Bold",
    },
    heading2: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 8,
      marginTop: 12,
      fontFamily: "PlayfairDisplay_600SemiBold",
    },
    heading3: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 6,
      marginTop: 8,
    },
    paragraph: {
      fontSize: 16,
      marginBottom: 10,
      lineHeight: 26,
    },
    strong: {
      fontWeight: "700",
    },
    em: {
      fontStyle: "italic",
    },
    link: {
      textDecorationLine: "underline",
      fontWeight: "500",
    },
    code_inline: {
      fontSize: 13,
      fontFamily: "Menlo, Monaco, monospace",
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    code_block: {
      fontSize: 13,
      fontFamily: "Menlo, Monaco, monospace",
      padding: 12,
      borderRadius: 8,
      marginVertical: 8,
      borderWidth: 1,
    },
    fence: {
      fontSize: 13,
      fontFamily: "Menlo, Monaco, monospace",
      padding: 12,
      borderRadius: 8,
      marginVertical: 8,
      borderWidth: 1,
    },
    blockquote: {
      borderLeftWidth: 3,
      paddingLeft: 12,
      paddingVertical: 8,
      marginVertical: 8,
      fontStyle: "italic",
    },
    list_item: {
      fontSize: 15,
      lineHeight: 22,
      marginBottom: 4,
    },
    bullet_list: {
      marginVertical: 4,
    },
    ordered_list: {
      marginVertical: 4,
    },
    hr: {
      height: 1,
      marginVertical: 12,
    },
    table: {
      borderWidth: 1,
      borderRadius: 8,
      marginVertical: 8,
    },
    thead: {},
    tbody: {
      backgroundColor: "transparent",
    },
    th: {
      fontWeight: "600",
      padding: 8,
      borderBottomWidth: 1,
    },
    td: {
      padding: 8,
      borderBottomWidth: 1,
    },
  });
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  const markdownStyles = createMarkdownStyles();

  return <Markdown style={markdownStyles}>{content}</Markdown>;
};
