
ko.components.register("state-default-tr", {
  viewModel: function(params) {
    // $data
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
  sort_click: function (vm, evt) {
    view.sort_by(evt.target.innerText);
  },
};

function year_sort(a, b) {
  x = _.parseInt(a.year);
  y = _.parseInt(b.year);
  return x == y ? 0 : (x < y ? -1 : 1);
}

function state_sort(a, b) {
  return a.state == b.state ? 0 : (a.state < b.state ? -1 : 1);
}

function compute_defaults() {
  var items = _(window.hosd)
    .filter(filter)
    .value();

  if (view.sort_by() == 'State') {
    items.sort(state_sort);
  } else if (view.sort_by()) {
    items.sort(year_sort);
  }

  return items;
}

view.defaults = ko.computed(compute_defaults);


ko.punches.enableAll();
ko.applyBindings(view /*, document.body */);
