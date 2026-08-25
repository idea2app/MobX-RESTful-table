declare module '*.css' {
  const classMap: Record<string, string>;

  export = classMap;
}

declare module '*.module.less' {
  const classMap: Record<string, string>;

  export = classMap;
}
