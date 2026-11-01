import { existsSync, readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('.') && context.parentURL)
      for (const extension of ['.ts', '.tsx', '/index.ts', '/index.tsx']) {
        const url = new URL(specifier + extension, context.parentURL);

        if (existsSync(fileURLToPath(url))) return nextResolve(url.href, context);
      }

    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith('.css'))
      return { format: 'module', source: 'export default {};', shortCircuit: true };

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
