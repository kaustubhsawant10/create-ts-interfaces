import path from "path";
import fs from "fs";

//validate file path
export const ValidateOutputFile = (inputPath) => {
  try {
    //Extract the directory part of the path, excluding the file name
    const directoryPath = path.dirname(path.resolve(inputPath));

    //Check if the directory exists and is a folder
    try {
      const stats = fs.statSync(directoryPath);
      //Return true if it's a directory, false otherwise
      if (stats.isDirectory()) return true;

      console.error(`Invalid argument for output file !!!`);

      return false;
    } catch (error) {
      //If the directory doesn't exist or other error occurs, return false
      // console.error(error);
      console.error(`Invalid argument for output file !!!`);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

//sanitize file path
export function SanitizeFilepath(inputPath) {
  try {
    //Resolve the path to absolute and normalize
    let sanitizedPath = path.resolve(inputPath);

    //Normalize path and remove any `..` (traversal) elements if present
    sanitizedPath = path.normalize(sanitizedPath);

    return sanitizedPath;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export function WriteFileSync(file, content) {
  try {
    fs.writeFileSync(file, content);
    return true;
  } catch (error) {
    console.log(`Failed to write to file: ${file}. Please retry.`);
    return false;
  }
}
