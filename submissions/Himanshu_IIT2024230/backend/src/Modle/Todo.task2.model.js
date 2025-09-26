import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum:  ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});


todoSchema.index({ completed: 1, createdAt: -1 });
todoSchema.index({ title: 'text', description: 'text' });

export const Todo = mongoose.model('Todo', todoSchema);    