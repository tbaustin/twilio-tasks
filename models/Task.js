var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  category: { type: String, default: '' },
  profile: { type: mongoose.Schema.Types.Mixed, default: {} },
  timestamp: { type: Date, default: Date.now },
});

TaskSchema.methods.summary = function() {
  var summary = {
    profile: this.profile,
    title: this.title,
    category: this.category,
    description: this.description,
    timestamp: this.timestamp,
    id: this._id.toString(),
  };

  return summary;
};

module.exports = mongoose.model('TaskSchema', TaskSchema);
