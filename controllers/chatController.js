import mongoose from "mongoose";
import Chat from "../models/chatModel.js";
import Participant from "../models/participantModel.js";

const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json({
      status: "success",
      results: chats.length,
      data: {
        chats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getChatsByUserId = async (req, res) => {
  try {
    const chats = await Participant.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.params.userId) },
      },
      {
        $lookup: {
          from: "chats",
          localField: "chat",
          foreignField: "_id",
          as: "chat",
        },
      },
      {
        $unwind: "$chat",
      },
      {
        $replaceRoot: { newRoot: "$chat" },
      },
    ]);

    res.status(200).json({
      status: "success",
      results: chats.length,
      data: chats,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const chatController = {
  getAllChats,
  getChatsByUserId,
};