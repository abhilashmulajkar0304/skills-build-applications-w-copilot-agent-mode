import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  score: number;
  streak: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);

export default Leaderboard;
