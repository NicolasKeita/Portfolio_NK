// no-comments-in-functions.js

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow comments inside functions",
    },
    messages: {
      avoidCommentsInFunctions: "Comments are not allowed inside function bodies. Prefer self-explanatory code.",
    },
  },
  create(context) {
    return {
      Program() {
        const sourceCode = context.sourceCode;
        const comments = sourceCode.getAllComments();

        for (const comment of comments) {
          let node = sourceCode.getNodeByRangeIndex(comment.range[0]);

          while (node) {
            if (
              node.type === "FunctionDeclaration" ||
              node.type === "FunctionExpression" ||
              node.type === "ArrowFunctionExpression"
            ) {
              context.report({
                loc: comment.loc,
                messageId: "avoidCommentsInFunctions",
              });
              break;
            }
            node = node.parent;
          }
        }
      },
    };
  },
};