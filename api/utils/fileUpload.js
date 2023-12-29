const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Define where to store the uploaded files
      cb(null, 'uploads') // In this example, files will be uploaded to the 'uploads' directory
    },
    filename: function (req, file, cb) {
      // Define the filename of the uploaded files
      cb(null, Date.now() +"_"+ file.originalname)
    }
  });
  const upload = multer({
    storage: storage,
     // Set file size limit if necessary
    // You can also define fileFilter if you want to restrict file types
  }); // 'productImage' should match the name attribute in your form input
  
  module.exports=upload

  