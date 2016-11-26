import React from 'react'
import { Text } from 'react-native-universal'
import { Display1, Headline, Title, Subheading, Body2, Body1, gu } from 'carbon-ui'
import merge from 'lodash/merge'
import SimpleMarkdown from 'simple-markdown'

import CodeBlock from 'src/modules/common/CodeBlock'
import InlineCode from 'src/modules/common/InlineCode'

export default merge(SimpleMarkdown.defaultRules, {
  strong: {
    react: (node, output, state) =>
      <Body2 key={state.key}>
        {output(node.content, state)}
      </Body2>,
  },
  paragraph: {
    react: (node, output, state) =>
      <Body1 key={state.key} style={styles.paragraph}>
        {output(node.content, state)}
      </Body1>,
  },
  text: {
    react: (node, output, state) =>
      <Text key={state.key}>
        {node.content}
      </Text>,
  },
  heading: {
    react: (node, output, state) => {
      let HeadingComponent = Body2
      switch (node.level) {
        case 1: HeadingComponent = Display1; break
        case 2: HeadingComponent = Headline; break
        case 3: HeadingComponent = Title; break
        case 4: HeadingComponent = Subheading; break
        case 5: HeadingComponent = Body2; break
        case 6: HeadingComponent = Body1; break
      }
      
      return (
        <HeadingComponent key={state.key} style={styles.heading}>
          {output(node.content, state)}
        </HeadingComponent>
      )
    },
  },
  codeBlock: {
    react: (node, output, state) =>
      <CodeBlock key={state.key}>
        {node.content}
      </CodeBlock>,
  },
  inlineCode: {
    react: (node, output, state) =>
      <InlineCode key={state.key}>
        {node.content}
      </InlineCode>,
  },
})

const styles = {
  paragraph: {
    marginBottom: 4 * gu,
  },
}
