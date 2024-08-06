const fs = require("fs");
const path = require("path");
const glob = require("glob");

const changeClassNames = (filePath) => {
	let content = fs.readFileSync(filePath, "utf8");

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

glob("src/**/*.js", (err, files) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	files.forEach(changeClassNames);
});
