namespace ts {
    // Comparison and compilation expressions
    export function CompileExpression(expression: any): Function {
        if (IsNull(expression))
            throw new Error("ArgumentNullException: expression has no value.");
        if (IsFunction(expression!)) return expression;
        const expressionType: string = typeof expression!;
        if (ContainsValue(["number", "object"], expressionType))
            throw new Error("ArgumentException: expression is of unexpected type.");

        var parts = expression!.split("=>");
        var args = parts.length > 0 ? parts.shift().trim().replace(/\(|\)/g, "") : null;
        var func = parts.length > 0 ? parts.join("=>").trim() : null;

        if (IsNull(args) || IsNull(func))
            throw new Error("ArgumentException: expression is invalid.");

        return new Function(args, "return (" + func + ");");
    };
}