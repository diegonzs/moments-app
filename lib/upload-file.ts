import imageCompression from 'browser-image-compression';

const imageCompressionOptions = {
	maxSizeMB: 5,
	maxWidthOrHeight: 600,
	useWebWorker: true,
};

type UploadedFile = { url: string; index: number };

const uploadImage = (
	file: File,
	index: number,
	allUploadedFiles: UploadedFile[]
) => {
	return imageCompression(file, imageCompressionOptions)
		.then((compressedFile) => {
			const formData = new FormData();
			formData.append('file', compressedFile);
			return fetch('/api/upload-image', { method: 'POST', body: formData });
		})
		.then((response) => response.json())
		.then((data) => {
			if (data.secure_url !== '') {
				allUploadedFiles.push({ url: data.secure_url, index });
			}
			return;
		})
		.catch((err) => console.error(err));
};

const uploadVideoAndAudio = (
	file: File,
	index: number,
	allUploadedFiles: UploadedFile[]
) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append(
		'upload_preset',
		`${process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET}`
	);
	return fetch(
		`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`,
		{
			method: 'POST',
			body: formData,
		}
	)
		.then((response) => response.json())
		.then((data) => {
			if (data.secure_url !== '') {
				allUploadedFiles.push({ url: data.secure_url, index });
			}
			return;
		})
		.catch((err) => console.error(err));
};

export const uploadFiles = async (files: File[]) => {
	const uploadFiles: UploadedFile[] = [];

	await Promise.all(
		files.map((file, index) => {
			if (file.type.includes('image')) {
				return uploadImage(file, index, uploadFiles);
			} else {
				return uploadVideoAndAudio(file, index, uploadFiles);
			}
			// return imageCompression(file, imageCompressionOptions)
			// 	.then((compressedFile) => {
			// 		const formData = new FormData();
			// 		formData.append('file', compressedFile);
			// 		return fetch('/api/upload-image', { method: 'POST', body: formData });
			// 	})
			// 	.then((response) => response.json())
			// 	.then((data) => {
			// 		if (data.secure_url !== '') {
			// 			uploadFiles.push({ url: data.secure_url, index });
			// 		}
			// 		return;
			// 	})
			// 	.catch((err) => console.error(err));
		})
	);

	const sortFiles = uploadFiles
		.sort((a, b) => a.index - b.index)
		.map((image) => image.url);
	const allFiles = `{${sortFiles}}`;
	console.log({ allFiles });
	return allFiles;
};

export const uploadVideos = async (videos: File[]) => {
	const uploadedVideos: { url: string; index: number }[] = [];
	await Promise.all(
		videos.map((video, index) => {
			const formData = new FormData();
			formData.append('file', video);
			formData.append(
				'upload_preset',
				`${process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET}`
			);
			return fetch(
				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`,
				{
					method: 'POST',
					body: formData,
				}
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.secure_url !== '') {
						uploadedVideos.push({ url: data.secure_url, index });
					}
					return;
				})
				.catch((err) => console.error(err));
		})
	);
	const sortVideos = uploadedVideos
		.sort((a, b) => a.index - b.index)
		.map((image) => image.url);
	const allVideos = `{${sortVideos}}`;
	console.log({ allVideos });
	return allVideos;
};

export const uploadNoteVoice = async (audio: File) => {
	const formData = new FormData();
	formData.append('file', audio);
	formData.append(
		'upload_preset',
		`${process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET}`
	);
	const data = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`,
		{
			method: 'POST',
			body: formData,
		}
	);
	const jsonData = await data.json();
	return jsonData.secure_url || '';
};
