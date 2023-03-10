function objectToArray(obj) {
  return Object.keys(obj).map((key) => obj[key]);
}

export function getTargets(obj) {
  const keys = Object.keys(obj).filter((key) => key.includes(":"));

  const targetIndices = [
    ...new Set(
      Object.keys(obj)
        .filter((key) => key.includes(":"))
        .map((key) => Number(key[key.length - 1]))
    ),
  ];

  return objectToArray(
    targetIndices
      .map((target) => ({
        [target]: keys
          .filter((key) => key.includes(target))
          .map((key) => ({ [key.split(":")[0]]: obj[key] }))

          .reduce((partial, val) => ({ ...partial, ...val })),
      }))
      .reduce((partial, val) => ({ ...partial, ...val }))
  ).map((target) => {
    return {
      ...target,
      fromMessages: target.fromMessages
        .split(";")
        .map((str) => str.trim().replace(/[^0-9a-zA-Z]/g, "")),
      toMessages: target.toMessages
        .split(";")
        .map((str) => str.trim().replace(/[^0-9a-zA-Z]/g, "")),
    };
  });
}
