import { prisma } from "../config/prisma.config.js"; 


export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        
    
        const authorId = req.user.userId; 

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required!" });
        }

        const newNote = await prisma.note.create({
            data: {
                title,
                content,
                authorId 
            }
        });

        return res.status(201).json({
            message: "Note created successfully!",
            note: newNote
        });

    } catch (error) {
        next(error);
    }
};


export const getAllNotes = async (req, res) => {
    try {
        const authorId = req.user.userId; 

        const notes = await prisma.note.findMany({
            where: {
                authorId: authorId
            },
            orderBy: {
                createdAt: "desc" 
            }
        });

        return res.status(200).json({
            count: notes.length,
            notes
        });

    } catch (error) {
        next(error);
    }
};

// 3. تعديل ملاحظة (Update Note)
export const updateNote = async (req, res) => {
    try {
        const { id } = req.params; // هناخد الـ id بتاع النوت من الـ URL
        const { title, content } = req.body;
        const authorId = req.user.userId; // الـ ID بتاع المستخدم الحالي

        // بنعمل update بشرطين: الـ id بتاع النوت صح، وبتاعت الـ author ده بالذات
        const updatedNote = await prisma.note.updateMany({
            where: {
                id: id,
                authorId: authorId // أمان زيادة!
            },
            data: {
                title,
                content
            }
        });

        // لو الـ count بصفر، يبقى النوت مش موجودة أو مش بتاعة المستخدم ده
        if (updatedNote.count === 0) {
            return res.status(404).json({ message: "Note not found or unauthorized to update!" });
        }

        return res.status(200).json({ message: "Note updated successfully!" });

    } catch (error) {
        next(error);
    }
};

// 4. مسح ملاحظة (Delete Note)
export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const authorId = req.user.userId;

        const deletedNote = await prisma.note.deleteMany({
            where: {
                id: id,
                authorId: authorId // أمان زيادة!
            }
        });

        if (deletedNote.count === 0) {
            return res.status(404).json({ message: "Note not found or unauthorized to delete!" });
        }

        return res.status(200).json({ message: "Note deleted successfully!" });

    } catch (error) {
        next(error);
    }
};