//validate swagger url
export const ValidateUrl = (url) => {
  try {
    const regex = /^https:\/\/[^\s]+\.json$/;
    if (regex.test(url)) return true;
    console.error(`Please enter valid url !!!`);
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Generate TypeScript interfaces
export function GenerateInterfaces(definitions) {
  try {
    if (!JSON.stringify(definitions)) {
      console.log(`No schema definitions found. Please retry.`);
      return undefined;
    }
    let tsInterfaces = "";
    for (const definitionName in definitions) {
      const definition = definitions[definitionName];
      tsInterfaces += `export interface ${definitionName} {\n`;
      for (const propertyName in definition.properties) {
        const property = definition.properties[propertyName];
        let tsType = GetEquivalentType(property);
        tsInterfaces += `\t${propertyName}: ${tsType};\n`;
      }
      tsInterfaces += "}\n\n";
    }
    return tsInterfaces;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

const GetEquivalentType = (property) => {
  try {
    switch (property.type) {
      case "integer":
        return "number";
      case "number":
        return "number";
      case "string":
        return "string";
      case "boolean":
        return "boolean";
      case "array":
        return `${GetEquivalentType(property.items)}[]`;
      default:
        let type = "any";
        if (property.$ref) type = property.$ref.split(`/`).pop();
        return type; // Default to any if type is not recognized
    }
  } catch (error) {
    console.error(error);
  }
};
