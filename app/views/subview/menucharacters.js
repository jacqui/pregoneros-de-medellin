define(['jquery',
        'underscore',
        'backbone',
        'utils/Logger',
        'models/Progression',
        'text!templates/streetwalk/menuCharactersViewTemplate.html',
        'text!templates/svg/svgMenuJaleTemplate.html',
        'text!templates/svg/svgMenuPajaritoTemplate.html'
        ],
function($, _, Backbone,
                LOGGER,
                Progression,
                streetWalkMenuCharactersViewTemplate,
                svgMenuJaleTemplate,
                svgMenuPajaritoTemplate){

  var MenuCharactersView = Backbone.View.extend({

    el:"#streetwalk-menucharacters",

    events:{
        "click .character":"toggleMenu"
    },

    bindings:{
            ".streetwalk-menucharacter[data-character='jale'] .character-unlocked":{
                observe:"charactersProgression",
                visible: true,
                onGet: function(charactersProgression) {
                    return charactersProgression.jale.characterUnlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='jale'] .character-locked":{
                observe:"charactersProgression",
                visible: function(val) { return val === false; },
                onGet: function(charactersProgression) {
                    return charactersProgression.jale.characterUnlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='jale'] .video1":{
                observe:"charactersProgression",
                visible: true,
                onGet: function(charactersProgression) {
                    return charactersProgression.jale.video1Unlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='jale'] .video1locked":{
                observe:"charactersProgression",
                visible: function(val) { return val === false; },
                onGet: function(charactersProgression) {
                    return charactersProgression.jale.video1Unlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='jale'] .video2":{
                observe:"charactersProgression",
                visible: true,
                onGet: function(charactersProgression) {
                    return charactersProgression.jale.video2Unlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='jale'] .video2locked":{
                observe:"charactersProgression",
                visible: function(val) { return val === false; },
                onGet: function(charactersProgression) {
                    return charactersProgression.jale.video2Unlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='jale'] .video3":{
                observe:"charactersProgression",
                visible: true,
                onGet: function(charactersProgression) {
                    return charactersProgression.jale.video3Unlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='jale'] .video3locked":{
                observe:"charactersProgression",
                visible: function(val) { return val === false; },
                onGet: function(charactersProgression) {
                    return charactersProgression.jale.video3Unlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='pajarito'] .character-unlocked":{
                observe:"charactersProgression",
                visible: true,
                onGet: function(charactersProgression) {
                    return charactersProgression.pajarito.characterUnlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='pajarito'] .character-locked":{
                observe:"charactersProgression",
                visible: function(val) { return val === false; },
                onGet: function(charactersProgression) {
                    return charactersProgression.pajarito.characterUnlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='pajarito'] .video1":{
                observe:"charactersProgression",
                visible: true,
                onGet: function(charactersProgression) {
                    return charactersProgression.pajarito.video1Unlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='pajarito'] .video1locked":{
                observe:"charactersProgression",
                visible: function(val) { return val === false; },
                onGet: function(charactersProgression) {
                    return charactersProgression.pajarito.video1Unlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='pajarito'] .video2":{
                observe:"charactersProgression",
                visible: true,
                onGet: function(charactersProgression) {
                    return charactersProgression.pajarito.video2Unlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='pajarito'] .video2locked":{
                observe:"charactersProgression",
                visible: function(val) { return val === false; },
                onGet: function(charactersProgression) {
                    return charactersProgression.pajarito.video2Unlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='pajarito'] .video3":{
                observe:"charactersProgression",
                visible: true,
                onGet: function(charactersProgression) {
                    return charactersProgression.pajarito.video3Unlocked;
                }
            },
            ".streetwalk-menucharacter[data-character='pajarito'] .video3locked":{
                observe:"charactersProgression",
                visible: function(val) { return val === false; },
                onGet: function(charactersProgression) {
                    return charactersProgression.pajarito.video3Unlocked;
                }
            }
    },

    initialize : function() {
        var self = this;

        self.render();
    },

    render: function() {
        var self = this;

        self.$el.html(_.template(streetWalkMenuCharactersViewTemplate));
        
        self.$el.find(".streetwalk-menucharacter[data-character='jale']").html(_.template(svgMenuJaleTemplate));
        self.$el.find(".streetwalk-menucharacter[data-character='pajarito']").html(_.template(svgMenuPajaritoTemplate));
        self.$el.find(".streetwalk-menucharacter[data-character='perso3']").html(_.template(svgMenuJaleTemplate));
        self.$el.find(".streetwalk-menucharacter[data-character='perso4']").html(_.template(svgMenuJaleTemplate));
        self.$el.find(".streetwalk-menucharacter[data-character='perso5']").html(_.template(svgMenuJaleTemplate));

        self.stickit(Progression);
    },

    toggleMenu: function(e) {
        var self = this;
        var dataCharacter = $(e.currentTarget).parents(".streetwalk-menucharacter").attr("data-character");

        if(self.$el.find(".submenu[data-state='open']").parents("[data-character='"+dataCharacter+"']").length < 1) {
            self.openMenu(dataCharacter);
        }
        else {
            self.closeMenu();
        }
    },

    openMenu: function(character) {
        var self = this;

        if(self.isOpening) {
            return;
        }

        self.closeMenu();
        var submenu = self.$el.find(".streetwalk-menucharacter[data-character='" + character + "']").find(".submenu");
        submenu.attr("data-state","open");
        TweenLite.fromTo(submenu, 0.5, {scaleY:0,scaleX:0,transformOrigin:"right bottom",onStart:function() {
            self.isOpening = true;
        }},{scaleY:1,scaleX:1,transformOrigin:"right bottom",onStart:function() {
            self.isOpening = false;
        }});
    },

    closeMenu: function() {
        var self = this;

        if(self.isClosing) {
            return;
        }

        var submenu = self.$el.find(".submenu[data-state='open']");

        TweenLite.fromTo(submenu, 0.5, {scaleY:1,scaleX:1,transformOrigin:"right bottom",onStart:function() {
            self.isClosing = true;
        }},{scaleY:0,scaleX:0,transformOrigin:"right bottom",onComplete: function() {
            submenu.attr("data-state","closed");
            self.isClosing = false;
        }});
    },

    onClose: function(){
      //Clean
      this.undelegateEvents();
    }

  });

  return MenuCharactersView;
  
});


