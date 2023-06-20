// Import the file system module
const fs = require('fs');

// Read the .npmvet.json file and parse it as an array of objects
const npmvet = JSON.parse(fs.readFileSync('.npmvet.json', 'utf8'));

// Read the package.json file and parse it as an object
const package = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Loop through the npmvet array and update the package dependencies and devDependencies accordingly
npmvet.forEach(item => {
  // If the item name exists in the package dependencies then update the dependency version to the installed version
  if (package.dependencies && package.dependencies[item.name]) {
    package.dependencies[item.name] = item.installed;
  }
  // If the item name exists in the package devDependencies then update the devDependency version to the installed version
  if (package.devDependencies && package.devDependencies[item.name]) {
    package.devDependencies[item.name] = item.installed;
  }
});

// Stringify the updated package object and write it back to the package.json file
fs.writeFileSync('package.json', JSON.stringify(package, null, 2), 'utf8');

// Log a success message
console.log('package.json updated successfully');
