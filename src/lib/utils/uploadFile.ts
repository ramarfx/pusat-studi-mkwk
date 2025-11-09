import path from 'path';
import { promises as fs } from 'fs';
import crypto from 'crypto';

export const uploadFile = async (file: File, filePath: string) => {
    		// Pastikan direktori upload tersedia
		const uploadDir = path.join('static', 'courses');
		await fs.mkdir(uploadDir, { recursive: true });

		// Konversi file ke buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Hash nama file agar unik
		const random = crypto.randomUUID();
		const hash = crypto
			.createHash('sha256')
			.update(buffer + random)
			.digest('hex');
		const ext = path.extname(file.name);
		const hashedName = `${hash}${ext}`;

		// Simpan file ke folder static
		const fullPath = path.join(uploadDir, hashedName);
		await fs.writeFile(fullPath, buffer);

		// Path publik
		const result = `${filePath}/${hashedName}`;

        return result
}