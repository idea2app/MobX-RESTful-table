import 'global-jsdom/register';

import { existsSync, readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

// web-utility checks `instanceof MediaStream` in its file meta detection
globalThis.MediaStream ??= class MediaStream {} as any;

const classNamesOf = (source: string) => [
  ...new Set([...source.matchAll(/\.([A-Za-z_$][\w$]*)/g)].map(([, name]) => name)),
];

registerHooks({
  resolve(specifier, context, nextResolve) {
    // lodash's UMD bundle has no statically detectable named exports for ESM
    if (specifier === 'lodash')
      return { url: new URL('./lodash.mjs', import.meta.url).href, shortCircuit: true };

    if (specifier.startsWith('.') && context.parentURL)
      for (const extension of ['.ts', '.tsx', '/index.ts', '/index.tsx']) {
        const url = new URL(specifier + extension, context.parentURL);

        if (existsSync(fileURLToPath(url))) return nextResolve(url.href, context);
      }

    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith('.css') || url.endsWith('.less')) {
      const path = fileURLToPath(url);
      const names = url.endsWith('.less') && existsSync(path) ? classNamesOf(readFileSync(path, 'utf8')) : [];
      const source =
        names.map(name => `export const ${name} = ${JSON.stringify(name)};`).join('\n') +
        '\nexport default {};';

      return { format: 'module', source, shortCircuit: true };
    }

    if (url.endsWith('.ts') || url.endsWith('.tsx')) {
      const { outputText } = ts.transpileModule(readFileSync(fileURLToPath(url), 'utf8'), {
        fileName: fileURLToPath(url),
        compilerOptions: {
          jsx: ts.JsxEmit.ReactJSX,
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
          useDefineForClassFields: true,
        },
      });

      return { format: 'module', source: outputText, shortCircuit: true };
    }

    return nextLoad(url, context);
  },
});
