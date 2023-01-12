import express from "express";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(fileUpload({ createParentPath: true }));

app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const file = req.files.file;

  if (!file) {
    return res.json({ error: "Incorrect input name" });
  }

  const newFileName = encodeURI(Date.now() + "-" + file.name);

  file.mv(`${__dirname}/uploads/${newFileName}`, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    }
    console.log("File was uploaded!");

    res.json({
      fileName: file.name,
      filePath: `/uploads/${newFileName}`,
    });
  });
});

app.get("/upload", (req, res) => {
  const history = `${__dirname}/uploads/MSFT_all_history.csv`;
});

app.listen(3000, () => console.log("Server started!"));
