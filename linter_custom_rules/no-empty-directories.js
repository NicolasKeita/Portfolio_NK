import fs from 'node:fs';
import path from 'node:path';

const ignoredNames = new Set([
  '.git',
  '.next',
  'node_modules',
  'dist',
  'build',
  'coverage',
]);

const checkedDirectories = new Set();
const reportedDirectories = new Set();

function formatDirectoryPath(directory) {
  const relativePath = path.relative(process.cwd(), directory);
  return relativePath || '.';
}

function scanDirectory(context, directory) {
  const resolvedDirectory = path.resolve(directory);

  if (checkedDirectories.has(resolvedDirectory)) {
    return;
  }

  checkedDirectories.add(resolvedDirectory);

  let entries;

  try {
    entries = fs.readdirSync(resolvedDirectory, { withFileTypes: true });
  } catch {
    return;
  }

  const visibleEntries = entries.filter((entry) => !ignoredNames.has(entry.name));

  if (visibleEntries.length === 0) {
    if (!reportedDirectories.has(resolvedDirectory)) {
      reportedDirectories.add(resolvedDirectory);

      context.report({
        loc: { line: 1, column: 0 },
        message: `Empty directory detected: ${formatDirectoryPath(resolvedDirectory)}. Delete this directory from the project.`,
      });
    }

    return;
  }

  for (const entry of visibleEntries) {
    if (entry.isDirectory()) {
      scanDirectory(context, path.join(resolvedDirectory, entry.name));
    }
  }
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow empty directories',
    },
    schema: [],
  },

  create(context) {
    const filename = context.filename || context.physicalFilename || '';

    if (!filename || filename === '<input>' || filename.startsWith('<')) {
      return {};
    }

    return {
      Program() {
        if (checkedDirectories.size > 0) {
          return;
        }

        scanDirectory(context, path.resolve(process.cwd(), 'src'));
      },
    };
  },
};
