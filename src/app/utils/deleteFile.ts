import fs from "fs";

export default (path: string) => {
  try {
    fs.unlinkSync(path);
  } catch (e) {
    console.log(e);
  }
};
