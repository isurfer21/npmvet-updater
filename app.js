// Import the file system module
const fs = require('fs');

// Import the path module
const path = require('path');

// Get the current working directory
const cwd = process.cwd(); 

// Function to get absolute path from current working directory
const absPath = (filename) => path.resolve(cwd, filename);

// Function to read json content from file and return as js object
const fetchJson = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(fileContent);
  } catch(err) {
    console.log(err.message);
    process.exit(1);
  }
}

// Read the .npmvet.json file and parse it as an array of objects
const npmvetPath = absPath('.npmvet.json');
const npmvet = fetchJson(npmvetPath);

// Read the package.json file and parse it as an object
const packagePath = absPath('package.json');
const package = fetchJson(packagePath);

// Loop through the npmvet array and update the package dependencies and devDependencies accordingly
npmvet.forEach(item => {
  // If the item name exists in the package dependencies then update the dependency version to the installedVersion
  if (package.dependencies && package.dependencies[item.name]) {
    package.dependencies[item.name] = item.installedVersion;
  }
  // If the item name exists in the package devDependencies then update the devDependency version to the installedVersion
  if (package.devDependencies && package.devDependencies[item.name]) {
    package.devDependencies[item.name] = item.installedVersion;
  }
});

// Stringify the updated package object and write it back to the package.json file
fs.writeFileSync(packagePath, JSON.stringify(package, null, 2), 'utf8');

// Log a success message
console.log('package.json updated successfully');
