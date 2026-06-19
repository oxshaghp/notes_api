import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
    try {
        // افحص الـ req.body بناء على الشروط
        schema.parse(req.body);
        next(); // كله تمام؟ عدي للـ controller
    } catch (error) {
        // تأكيد صريح: هل الإيرور ده جاي من مكتبة Zod؟
        if (error instanceof ZodError) {
            const errorMessages = error.issues.map((err) => ({
                field: err.path[0],
                message: err.message
            }));
            return res.status(400).json({ errors: errorMessages });
        }

        // لو الإيرور مش من Zod (إيرور برمجياً مثلاً) مرره للـ Express
        return res.status(500).json({ message: "Internal server error during validation", error: error.message });
    }
};