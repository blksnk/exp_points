Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

Number.prototype.isBetween = function(min, max, strict) {
  return strict ? this > min && this < max : this >= min && this <= max
}
