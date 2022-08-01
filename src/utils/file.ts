export function downloadFile(
	content: string | ArrayBuffer | Uint8Array,
	filename,
	type = 'text/plain'
) {
	const blob = new Blob([content], { type });
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.click();
	window.URL.revokeObjectURL(url);
}
