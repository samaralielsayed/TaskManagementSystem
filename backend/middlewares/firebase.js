const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../config/firebase");

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const storageFB = getStorage();
    const file = req.file;

    const fileData = {
      mimetype: file.mimetype,
      buffer: file.buffer,
    };

    await signInWithEmailAndPassword(
      auth,
      process.env.FIREBASE_USER,
      process.env.FIREBASE_AUTH
    );

    const dateTime = Date.now();
    const fileName = `tasks/${dateTime}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {
      contentType: file.mimetype,
    };

    await uploadBytesResumable(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(ref(storageFB, fileName));

    req.body.image = downloadURL;
    next();
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Upload failed: " + err.message,
    });
  }
};

module.exports = {
  uploadImage,
};
