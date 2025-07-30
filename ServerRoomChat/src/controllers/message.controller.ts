import { Request, Response } from 'express';
import { Message } from '../models/message.model';
export const  getMessages = async (req: Request, res: Response) => {
  const { roomId } = req.query;

  if (!roomId) {
    return res.status(400).json({ error: 'Room ID is required' });
  }

  try {
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};