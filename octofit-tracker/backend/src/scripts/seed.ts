import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava', email: 'ava@example.com', age: 16, fitnessLevel: 'Intermediate' },
      { name: 'Leo', email: 'leo@example.com', age: 17, fitnessLevel: 'Advanced' },
      { name: 'Mia', email: 'mia@example.com', age: 15, fitnessLevel: 'Beginner' },
    ]);

    const phoenix = await Team.create({
      name: 'Phoenix',
      description: 'Fast-paced endurance team',
      members: [users[0]._id, users[1]._id],
    });

    const comet = await Team.create({
      name: 'Comet',
      description: 'Strength and balance squad',
      members: [users[2]._id],
    });

    await User.updateMany(
      { _id: { $in: [users[0]._id, users[1]._id, users[2]._id] } },
      { $set: { team: phoenix._id } }
    );

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        duration: 30,
        caloriesBurned: 280,
        date: new Date(),
      },
      {
        user: users[1]._id,
        type: 'Strength',
        duration: 45,
        caloriesBurned: 320,
        date: new Date(),
      },
      {
        user: users[2]._id,
        type: 'Walking',
        duration: 20,
        caloriesBurned: 120,
        date: new Date(),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[1]._id, score: 980, streak: 7, rank: 1 },
      { user: users[0]._id, score: 920, streak: 5, rank: 2 },
      { user: users[2]._id, score: 780, streak: 3, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        name: 'Sprint Intervals',
        category: 'Cardio',
        duration: 25,
        difficulty: 'Intermediate',
        description: 'Short bursts of sprinting to improve speed and endurance.',
      },
      {
        name: 'Bodyweight Circuit',
        category: 'Strength',
        duration: 30,
        difficulty: 'Beginner',
        description: 'A full-body circuit with squats, lunges, push-ups, and planks.',
      },
      {
        name: 'Mobility Flow',
        category: 'Recovery',
        duration: 15,
        difficulty: 'Easy',
        description: 'Mobility-focused routine for flexibility and recovery.',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
