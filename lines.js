import fs from "fs/promises";
let files = await fs.readdir("./src", { recursive: true });

files = files.filter((file) => file.endsWith(".jsx") || file.endsWith(".css"));

console.log(files);



let totalLines = 0;
for (const file of files) {
    if (file.endsWith(".jsx") || file.endsWith(".css")) {
        const data = await fs.readFile("./src/" + file, "utf8");
        //get line numbers
        const lines = data.split("\n");
        totalLines += lines.length;
    }


}

console.log("Total Lines: " + totalLines);