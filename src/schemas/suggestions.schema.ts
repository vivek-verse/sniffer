import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SuggestionsSchema = new Schema({
  name: { type: "string" },
  location: {
    type: { type: String },
    coordinates: [],
  },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
});

SuggestionsSchema.index({ location: "2dsphere" });
SuggestionsSchema.index({ name: "text" });

SuggestionsSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt) this.createdAt = currentDate;
  next();
});

SuggestionsSchema.pre("update", function (next) {
  this.updateOne({}, { $set: { updatedAt: new Date() } });
  next();
});

export const Suggestions = mongoose.model("suggestions", SuggestionsSchema);
