import fs from 'fs';

async function main() {
	try {
		fs.copyFileSync('build/200.html', 'build/ipfs-404.html');
	} catch (e) {
		console.error(e.message || e);
	}
}

main();
