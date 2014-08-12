
ko.punches.enableAll();

ko.components.register("state-default-tr", {
  viewModel: function(params) {
    this.year = params.data.year || "unknown";
    this.state = params.data.state;
    this.comment = params.data.comment;
  },
  template: {element: "state-default-tr-template"}
});

function filter(item) {
  if (!view.grep()) {
    return true;
  }
  return (item.year + " " + item.state).toLowerCase()
    .indexOf(view.grep().toLowerCase()) >= 0;
}

var view = {
  grep: ko.observable().extend({rateLimit: 200}),
  sort_by: ko.observable(),
  defaults: ko.observableArray(),
  sort_click: function (vm, evt) {
    view.sort_by(evt.target.innerText);
  },
};

var unsorted_defaults = ko.observableArray(window.hosd).filter(filter);

function year_sort(a, b) {
  return a.year == b.year ? 0 : (a.year < b.year ? -1 : 1);
}

function state_sort(a, b) {
  return a.state == b.state ? 0 : (a.state < b.state ? -1 : 1);
}

function sort_defaults_fn() {
  var sort_by = view.sort_by();
  var items = unsorted_defaults().concat();
  if (!sort_by || sort_by == 'None') {
    view.defaults(items);
  }
  view.defaults(items.sort(sort_by == 'State' ? state_sort : year_sort))
}
var sort_defaults = _.debounce(sort_defaults_fn, 200);

unsorted_defaults.subscribe(sort_defaults);
view.sort_by.subscribe(sort_defaults);
sort_defaults();

ko.applyBindings(view);
