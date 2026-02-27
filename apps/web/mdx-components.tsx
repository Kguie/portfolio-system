import * as React from "react";
import type { MDXComponents } from "mdx/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function textFromChildren(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(textFromChildren).join(" ");
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return textFromChildren(children.props.children);
  }

  return "";
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => {
      const id = slugify(textFromChildren(children));
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const id = slugify(textFromChildren(children));
      return (
        <h3 id={id} {...props}>
          {children}
        </h3>
      );
    },
    ...components,
  };
}
