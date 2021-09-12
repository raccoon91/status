import React from "react";
import { Container, ScrollBox, Bold, Text, Link } from "@src/components/atoms";
import { privacyPolicy } from "@src/configs";

export const PrivacyPolicyScreen = () => {
  return (
    <Container py="10px">
      <ScrollBox px="20px">
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
      </ScrollBox>
    </Container>
  );
};
