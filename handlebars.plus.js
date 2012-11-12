//Helpers
(function(Handlebars){
    //ref: https://gist.github.com/1371586

    // HELPER: #each_key_value
    //
    // Usage: {{#each_key_value obj}} Key: {{key}} // Value: {{value}} {{/each_key_value}}
    //
    // Iterate over an object, setting 'key' and 'value' for each property in
    // the object.
    Handlebars.registerHelper("each_key_value", function(obj, fn) {
        var buffer = "",
        key;

        console.log(arguments);

        //if (typeof obj !== "undefined"){
            $.each(obj, function(key,value){
                buffer += fn({key: key, value: obj[key]});
            });
        //}

        return buffer;
    });


    Handlebars.registerHelper("if_no", function(value, args) {

        if (typeof value === "number" || typeof value === "string") return value;

        if (args.hash.then_default !== undefined) return args.hash.then_default;

        return "";
    });

    Handlebars.registerHelper("bool", function(value, args) {

        console.log("bool:");
        console.log(arguments);

        if (value) return "true";
        return "false";
    });

    Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
        if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
        if( lvalue!=rvalue ) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

        var operators, result;
        
        if (arguments.length < 3) {
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        }
        
        if (options === undefined) {
            options = rvalue;
            rvalue = operator;
            operator = "===";
        }
        
        operators = {
            '==': function (l, r) { return l == r; },
            '===': function (l, r) { return l === r; },
            '!=': function (l, r) { return l != r; },
            '!==': function (l, r) { return l !== r; },
            '<': function (l, r) { return l < r; },
            '>': function (l, r) { return l > r; },
            '<=': function (l, r) { return l <= r; },
            '>=': function (l, r) { return l >= r; },
            'typeof': function (l, r) { return typeof l === r; }
        };
        
        if (!operators[operator]) {
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        }
        
        result = operators[operator](lvalue, rvalue);
        
        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    });
})(Handlebars);


(function(Handlebars, window, $){
    var out = window.handlebarsPlus = {};

    //handlebarsTemplateFromId
    var template =
    out.template = function(id){
        return Handlebars.compile( $("#"+id).html() );
    };

    var registerPartialFromId =
    out.registerPartialFromId = function(id){
        var templ = template(id);
        Handlebars.registerPartial( id, templ );
        return templ;
    };

})(Handlebars, window, jQuery);
