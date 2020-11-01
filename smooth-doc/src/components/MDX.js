import React from 'react'
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react'
import { Code } from './Code'
import { CarbonAd } from './CarbonAd'

function transformCode({ children, className, ...props }) {
  const lang = className && className.split('-')[1]
  return (
    <Code lang={lang} {...props}>
      {children}
    </Code>
  )
}

function getCodeChild(children) {
  const childrenArray = React.Children.toArray(children)
  if (childrenArray.length !== 1) return null
  const [firstChild] = childrenArray
  if (firstChild.props.mdxType !== 'code') return null
  return firstChild
}

export const mdxComponents = {
  'carbon-ad': () => <CarbonAd />,
  pre: ({ children }) => {
    const codeChild = getCodeChild(children)
    return <pre>{codeChild ? transformCode(codeChild.props) : children}</pre>
  },
  // transforms internal links in MDX into GatsbyLink components
  a: ({ href, ...p }) => {
    const isExternal = href.indexOf('http') > -1
    return isExternal ? <a href={href} {...p} /> : <Link to={href} {...p} />
  },
}

export function MDXProvider({ children, components }) {
  return (
    <BaseMDXProvider components={{ ...mdxComponents, ...components }}>
      {children}
    </BaseMDXProvider>
  )
}
