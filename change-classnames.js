const fs = require("fs");
const path = require("path");
const log = console.log;

const recursiveReadFiles = (dir) => {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		const filePath = path.resolve(dir, file);
		const stat = fs.statSync(filePath);
		if (stat && stat.isDirectory()) {
			results = results.concat(recursiveReadFiles(filePath));
		} else {
			results.push(filePath);
		}
	});
	return results;
};

const changeClassNames = (filePath) => {
	let content = fs.readFileSync(filePath, "utf8");
	log("working on file: ", filePath);

	const classNameChanges = {
		"bg-color-teal": "bg-neutral-200",
		"bg-color-yellow": "bg-warning",
		"color-red": "text-danger",
		"color-yellow": "text-warning",
	};

	Object.keys(classNameChanges).forEach((oldClassName) => {
		const newClassName = classNameChanges[oldClassName];
		const regex = new RegExp(`\\b${oldClassName}\\b`, "g");
		content = content.replace(regex, newClassName);
	});

	fs.writeFileSync(filePath, content, "utf8");
};

recursiveReadFiles("src").forEach(changeClassNames);
