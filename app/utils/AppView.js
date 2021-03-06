define(['jquery',
        'underscore',
        'backbone',
        'utils/Logger'],
        function($, _,
                Backbone,
                LOGGER) {

    //Utility to manage views/page change and transition
    var AppView = {

        init: function() {
            var self = this;

        },

        show: function(view) {
            if (this.currentView){

              if(this.currentView.el.id == "page") {
                 this.currentView.closeView();
                 return this.closeModalPage();
              }

              //if paused , do not close
              this.currentView.onClose();
              this.lastView = this.currentView;
            }
         
            this.currentView = view;

            this.currentView.prepare();

            return view;
        },

        showModalPage: function(view) {
            if(this.currentView) {
                this.lastView = this.currentView;

                if(this.lastView.el.id == "streetwalk") {
                    //pause streetwalk
                    this.lastView.pause();
                }
            }

            this.currentView = view;
        },

        closeModalPage: function() {
            this.currentView = this.lastView;

            if(this.lastView.el.id == "streetwalk") {
                //play streetwalk
                this.lastView.play();
            }

            return this.currentView;
        },

        changePage: function(view) {
            if(this.lastView) {
                this.lastView.$el.hide();
            }
            view.$el.show();

            if(this.currentView.paused) {
                this.currentView.play();
            }
        }


    };

    _.extend(AppView, Backbone.Events);
    
    return AppView;
});