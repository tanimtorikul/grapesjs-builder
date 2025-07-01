import React from "react";

export default function renderComponent(node, stylesMap, data) {
  if (!node) return null;

  if (node.type === "text") {
    let content = node.content || "";
    content = content
      .replace(/{name}/g, data.name || "")
      .replace(/{price}/g, data.data?.price || "")
      .replace(/{color}/g, data.data?.color || "")
      .replace(/{year}/g, data.data?.year || "");

    return (
      <div
        key={node.attributes?.id || Math.random()}
        style={stylesMap[node.attributes?.id] || {}}
      >
        {content}
      </div>
    );
  }

  if (node.components && Array.isArray(node.components)) {
    return (
      <div
        key={node.attributes?.id || Math.random()}
        style={stylesMap[node.attributes?.id] || {}}
      >
        {node.components.map((child) =>
          renderComponent(child, stylesMap, data)
        )}
      </div>
    );
  }

  // fallback if plain string
  if (typeof node === "string") {
    return <div dangerouslySetInnerHTML={{ __html: node }} />;
  }

  return null;
}
