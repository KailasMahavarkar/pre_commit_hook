const fs = require("fs");
const path = require("path");
const glob = require("glob");

const changeClassNames = (filePath) => {
	let content = fs.readFileSync(filePath, "utf8");

	// Define your class name changes here
	const classNameChanges = {
		"old-classname": "new-classname",
		"another-old-classname": "another-new-classname",
		// Add more class name changes as needed
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
