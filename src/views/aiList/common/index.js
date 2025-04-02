export function findParentLabels(types, searchParams) {
  const getLabel = (option, searchParams, path = [], result = []) => {
    const matches = Object.values(searchParams).some((value) =>
      Object.values(option.param || {}).includes(value)
    );

    if (matches) {
      path.push(option.label);
      if (!result.includes(path.join("/"))) {
        result.push(path.join("/"));
      }
    }

    if (option.children && option.children.length > 0) {
      option.children.forEach((child) => {
        getLabel(child, searchParams, [...path, option.label], result);
      });
    }

    return result;
  };

  return types.options.flatMap((option) => getLabel(option, searchParams));
}

export function findLabelBySize(width, height, options) {
  for (const option of options) {
    if (option.param.width === width && option.param.height === height) {
      return option.label;
    }
  }
  return null;
}
