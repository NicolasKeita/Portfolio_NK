// max-files-per-directory.js
// ESLint rule: warns if a directory contains more than 10 files

import fs from 'fs';
import path from 'path';

const MAX_FILES = 10;
const reportedDirectories = new Set();

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Warn when a directory contains more than " + MAX_FILES + " files",
    },
    messages: {
      tooManyFiles:
        "This directory '{{dir}}' contains {{count}} files, which exceeds the maximum of {{max}}.",
    },
    schema: [
      {
        type: "object",
        properties: {
          max: {
            type: "number",
            default: MAX_FILES,
          },
          ignore: {
            type: "array",
            items: { type: "string" },
            default: [],
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const max = options.max || MAX_FILES;
    const ignorePatterns = (options.ignore || []).map((p) => new RegExp(p));

    const filename = context.filename || context.physicalFilename || "";

    // Skip ignored files (node_modules, .next, etc.)
    if (ignorePatterns.some((pattern) => pattern.test(filename))) {
      return {};
    }

    // Skip virtual files (like <input>)
    if (!filename || filename === "<input>" || filename.startsWith("<")) {
      return {};
    }

    const dir = path.dirname(filename);

    // Only report once per directory
    if (reportedDirectories.has(dir)) {
      return {};
    }

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      const fileCount = entries.filter((entry) => entry.isFile()).length;

      if (fileCount > max) {
        reportedDirectories.add(dir);

        return {
          Program(node) {
            context.report({
              node,
              messageId: "tooManyFiles",
              data: {
                dir: path.basename(dir) || dir,
                count: String(fileCount),
                max: String(max),
              },
            });
          },
        };
      }
    } catch {
      // If we can't read the directory, skip silently
    }

    return {};
  },
};