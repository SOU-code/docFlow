const { default: mongoose } = require("mongoose");
const docModel = require("../models/docModel.js");
const userModel = require("../models/userModel.js");

exports.createDocController = async (req, res) => {
  try {
    const { content, user, email } = req.body;

    if (!content || !user) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const newDoc = new docModel({ content, user, email });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newDoc.save({ session });
    existingUser.docs.push(newDoc);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newDoc.save();

    return res.status(201).send({
      success: true,
      message: "Document created",
      newDoc,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error al crear el documento",
      error,
    });
  }
};

exports.updateDocController = async (req, res) => {
  try {
    const { id } = req.params;

    // const {content}= req.body

    const doc = await docModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Document updated",
      doc,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while updating documento",
      error,
    });
  }
};

exports.addUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const docId = await docModel.findById(id);

    const { email } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email not registered",
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    await docId.save({ session });
    docId.email.push(email);
    await docId.save({ session });
    await session.commitTransaction();

    const session2 = await mongoose.startSession();
    session2.startTransaction();
    await user.save({ session2 });
    user.docs.push(docId);
    await user.save({ session2 });
    await session2.commitTransaction();

    return res.status(201).send({
      success: true,
      message: `Access given to ${email}`,
      docId,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while giving access",
      error,
    });
  }
};

exports.deleteDocController = async (req, res) => {
  try {
    const doc = await docModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await doc.user.docs.pull(doc);
    await doc.user.save();

    return res.status(200).send({
      success: true,
      message: "Document deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting documento",
      error,
    });
  }
};

exports.getDocController = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await docModel.findById(id);

    if (!doc) {
      return res.status(404).send({
        success: false,
        message: "No Document found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Document fetched",
      doc,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while getting documento",
      error,
    });
  }
};

exports.userDocController = async (req, res) => {
  try {
    const userDoc = await userModel.findById(req.params.id).populate("docs");

    if (!userDoc) {
      return res.status(404).send({
        success: false,
        message: "No user documents found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User documents",
      userDoc,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while getting user documents",
      error,
    });
  }
};
