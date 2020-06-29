Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

Number.prototype.isBetween = function(min, max) {
  return this >= min && this <= max
}
