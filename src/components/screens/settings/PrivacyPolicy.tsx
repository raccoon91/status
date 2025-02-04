import React from "react";
import { Bold, Text, Link } from "@src/components/atoms";
import { ScrollScreenTemplate } from "@src/components/templates";
import { privacyPolicy } from "@src/configs";

export const PrivacyPolicyScreen = () => {
  return (
    <ScrollScreenTemplate w="80%" p="20px 10px">
      {privacyPolicy.split("\n").map((text, index) => {
        if (text.slice(0, 2) === "**" && text.slice(-2) === "**") {
          return <Bold key={`p-${index}`}>{text.slice(2, -2)}</Bold>;
        } else if (text.slice(0, 2) === "!*") {
          const [, name, href] = text.split("!*");

          return (
            <Link key={`p-${index}`} href={href}>
              {name}
            </Link>
          );
        }

        return (
          <Text key={`p-${index}`} line="20px">
            {text}
          </Text>
        );
      })}
    </ScrollScreenTemplate>
  );
};
