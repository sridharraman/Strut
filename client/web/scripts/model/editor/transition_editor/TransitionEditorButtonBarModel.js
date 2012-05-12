// Generated by CoffeeScript 1.2.1-pre

define(["vendor/backbone"], function(Backbone) {
  var toDeg;
  toDeg = 180 / Math.PI;
  return Backbone.Model.extend({
    initialize: function() {
      var deck;
      deck = this.get("deck");
      deck.on("change:activeSlide", this._activeSlideChanged, this);
      this._lastActive = null;
      return this._activeSlideChanged(deck, deck.get("activeSlide"));
    },
    _activeSlideChanged: function(deck, slide) {
      if (this._lastActive != null) this._lastActive.off(null, null, this);
      this._lastActive = slide;
      if (slide != null) {
        slide.on("change:rotateX", this._slideRotationChanged, this);
        slide.on("change:rotateY", this._slideRotationChanged, this);
        return slide.on("change:rotateZ", this._slideRotationChanged, this);
      }
    },
    _slideRotationChanged: function(slide, value) {
      return this.trigger("change:slideRotations", this, this.slideRotations());
    },
    slideRotations: function() {
      var slide;
      slide = this._lastActive;
      if (slide != null) {
        return [slide.get("rotateX") * toDeg, slide.get("rotateY") * toDeg, slide.get("rotateZ") * toDeg];
      } else {
        return [0, 0, 0];
      }
    },
    changeSlideRotations: function() {},
    constructor: function TransitionEditorButtonBarModel() {
			Backbone.Model.prototype.constructor.apply(this, arguments);
		}
  });
});
