export const errorHandler = (err, req, res, next) => {
    console.error("💥 Global Error Caught:", err.message);

    // لو الإيرور إحنا مأمنينه ومديينه status معين، استخدمه، وإلا خليه 500
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        // بنعرض الـ stack trace في بيئة التطوير بس عشان يساعدنا في الـ Debugging
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    });
};