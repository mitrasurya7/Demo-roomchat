import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface
export interface IMessage extends Document {
  user: string;
  roomId: string;
  text: string;
  timestamp: Date;
}

// Mongoose schema
const MessageSchema: Schema = new Schema(
  {
    user: { type: String, required: true },
    roomId: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete (ret as any)._id;
        return ret;
      },
    },
  }
);

// ✅ Tambahkan virtual id
MessageSchema.virtual('id').get(function () {
  return (this._id as any).toString();
});

// Export model
export const Message = mongoose.model<IMessage>('Message', MessageSchema);
