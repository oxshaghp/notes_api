import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        // 1. نجيب الـ Token من الـ Headers
        // الـ Frontend بيبعته في صيغة: "Bearer eyJhbGci..."
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied! No token provided." });
        }

        // 2. نفصل كلمة "Bearer" عن الـ Token الحقيقي
        const token = authHeader.split(" ")[1];

        // 3. التحقق من صحة الـ Token وفك التشفير
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // 4. نمرر بيانات المستخدم (اللي هي الـ userId) للـ req عشان الـ Controllers اللي جاية تشوفها
        req.user = verified;

        // 5. انقل الطلب للدالة اللي بعد كده (الدالة بتاعة الـ Notes مثلاً)
        next();
    } catch (error) {
        // لو الـ Token منتهي الصلاحية أو ميزور هيدخل هنا
        return res.status(403).json({ message: "Invalid or expired token!" });
    }
};