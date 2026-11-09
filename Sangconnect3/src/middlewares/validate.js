export function validate(schema, source) {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            return res.status(400).json({
                message: "Données invalides",
                errors: result.error.issues.map(i => ({
                    field: i.path.join("."),
                    message: i.message
                }))
            });
        }

        if (source === "query") {
            // Express 5 : req.query est un getter, on le redéfinit
            Object.defineProperty(req, "query", {
                value: result.data,
                writable: true,
                configurable: true
            });
        } else {
            req[source] = result.data;
        }

        next();
    };
}