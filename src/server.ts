import app from "./index";

require("dotenv").config(".env"!!);
// set port, listen for requests

// Server Configuration
const PORT = process.env.PORT || process.env.PORT_BACKUP;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
