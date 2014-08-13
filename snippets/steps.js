// Generated by CoffeeScript 1.7.1
var snippets;

snippets = {
  ".text.html": {
    "Step 1: Add <script> tags": {
      prefix: "s1",
      part: 1,
      body: "\n<!-- SCRIPTS -->\n<script src='../lib/knockout.js'></script>\n<script src='../lib/lodash.js'></script>\n<!-- plugins -->\n<script src='../lib/knockout-projections.js'></script>\n<script src='../lib/knockout.punches.js'></script>\n<!-- Some data -->\n<script src='../data/hosd.js'></script>\n<!-- Our javascript (we'll be editing) -->\n<script src=\"./my.js\"></script>"
    },
    "Step 3: Show the list on the screen": {
      prefix: "s3",
      part: 2,
      body: "<h1>List of State defaults</h1>\n\n<ul data-bind='foreach: defaults'>\n  <li>\n    <span data-bind='text: year'></span>\n  </li>\n</ul>"
    },
    "Step 4: Use Punches {{ }} interpolation": {
      prefix: "s4",
      part: 2,
      body: "<b>{{ year }}</b> {{ state }}"
    },
    "Step 6: Add grepping": {
      prefix: "s6",
      part: 3,
      body: "<input type='text' data-bind='textInput: grep'/>"
    },
    "Step 10: Change to a web component": {
      prefix: "s10",
      part: 4,
      body: "<state-default params=\"data: $data\"></state-default>"
    },
    "Step 12: Add state-default-template <template>": {
      prefix: "s12",
      part: 5,
      body: "<b>{{ year }}</b> {{ state }}"
    },
    "Step 13: Uh oh - Change state template to a <tr>": {
      prefix: "s13",
      part: 5,
      body: "<table>\n  <thead>\n    <th> Year </th> <th> State </th> <th> Comment </th>\n  </thead>\n  <tbody data-bind='foreach: defaults'>\n    <state-default-tr params=\"data: $data\"></state-default-tr>\n  </tbody>\n</table>\n\n<template id='state-default-tr-template'>\n  <tr>\n    <td> {{ year }} </td> <td> {{ state }} </td> <td> {{ comment }} </td>\n  </tr>\n</template>"
    },
    "Step 15: Use inline components: binding": {
      prefix: "s15",
      part: 5,
      body: "<table>\n  <thead>\n    <th> Year </th> <th> State </th> <th> Comment </th>\n  </thead>\n  <tbody data-bind='foreach: defaults'>\n    <tr data-bind='component: {\n        name: \"state-default-tr\", params: {data: $data} }'>\n    </tr>\n  </tbody>\n</table>\n\n<template id='state-default-tr-template'>\n  <td> {{ year }} </td> <td> {{ state }} </td> <td> {{ comment }} </td>\n</template>"
    },
    "Step 16: Add sort-by html": {
      prefix: "s16",
      part: 6,
      body: "<div class='sort'>\n  Sort by ({{ sort_by()|default:\"unsorted\" }}):<br/>\n  <button data-bind='click: sort_click'>None</button>\n  <button data-bind='click: sort_click'>State</button>\n  <button data-bind='click: sort_click'>Year</button>\n</div>"
    }
  },
  ".source.js": {
    "Step 2: Add KO to my.js": {
      prefix: "s2",
      part: 1,
      body: "var view = {\n  defaults: window.hosd\n};\n\nko.applyBindings(view);"
    },
    "Step 5: Enable punches": {
      prefix: "s5",
      part: 2,
      body: "ko.punches.enableAll();"
    },
    "Step 7: Use projections to filter the view": {
      prefix: "s7",
      part: 3,
      body: "function filter(item) {\n  if (!view.grep()) {\n    return true;\n  }\n  return (item.year + \" \" + item.state).toLowerCase()\n    .indexOf(view.grep().toLowerCase()) >= 0;\n}\n\nvar view = {\n  grep: ko.observable(),\n};\n\nview.defaults = ko.observableArray(window.hosd).filter(filter);"
    },
    "Step 8: Use rate limit to improve performance": {
      prefix: "s8",
      part: 3,
      body: "grep: ko.observable().extend({rateLimit: 200}),"
    },
    "Step 9: Using Web Components": {
      prefix: "s9",
      part: 4,
      body: "ko.components.register(\"state-default\", {\n  viewModel: function(params) {\n    this.year = params.data.year || \"unknown\";\n    this.state = params.data.state;\n    this.comment = params.data.comment;\n  },\n  template: \"<b>{{ year }}</b> {{ state }}\"\n});"
    },
    "Step 11: Switch to template-by-element": {
      prefix: "s11",
      part: 4,
      body: "template: {element: \"state-default-template\"}"
    },
    "Step 14: Change ko.component to -tr": {
      prefix: "s14",
      part: 5,
      body: "ko.components.register(\"state-default-tr\", {\n  viewModel: function(params) {\n    this.year = params.data.year || \"unknown\";\n    this.state = params.data.state;\n    this.comment = params.data.comment;\n  },\n  template: {element: \"state-default-tr-template\"}\n});"
    },
    "Step 17: Add sorting": {
      prefix: "s17",
      part: 6,
      body: "var view = {\n  grep: ko.observable().extend({rateLimit: 200}),\n  sort_by: ko.observable(),\n  sort_click: function (vm, evt) {\n    view.sort_by(evt.target.innerText);\n  }\n};"
    },
    "Step 18: Sort the observables": {
      prefix: "s18",
      part: 6,
      body: "var unsorted_defaults = ko.observableArray(window.hosd)\n  .filter(filter)\n  .extend({rateLimit: 200});\nvar sortable_defaults = ko.observableArray(unsorted_defaults());\nunsorted_defaults.subscribe(sortable_defaults)\n\nfunction year_sort(a, b) {\n  return a.year == b.year ? 0 : (a.year < b.year ? -1 : 1);\n}\n\nfunction state_sort(a, b) {\n  return a.state == b.state ? 0 : (a.state < b.state ? -1 : 1);\n}\n\nview.defaults = ko.computed(function () {\n  var sort_by = view.sort_by();\n  var items = sortable_defaults();\n  if (!sort_by || sort_by == 'None') {\n    return items;\n  }\n  return items.sort(sort_by == 'State' ? state_sort : year_sort)\n});"
    },
    "Step 19: Fix the observable sorting": {
      prefix: "s19",
      part: 6,
      body: "var view = {\n  grep: ko.observable().extend({rateLimit: 200}),\n  sort_by: ko.observable(),\n  defaults: ko.observableArray(),\n  sort_click: function (vm, evt) {\n    view.sort_by(evt.target.innerText);\n  },\n};\n\nvar unsorted_defaults = ko.observableArray(window.hosd).filter(filter);\n\nfunction year_sort(a, b) {\n  return a.year == b.year ? 0 : (a.year < b.year ? -1 : 1);\n}\n\nfunction state_sort(a, b) {\n  return a.state == b.state ? 0 : (a.state < b.state ? -1 : 1);\n}\n\nfunction sort_defaults_fn() {\n  var sort_by = view.sort_by();\n  var items = unsorted_defaults().concat();\n  if (!sort_by || sort_by == 'None') {\n    view.defaults(items);\n  }\n  view.defaults(items.sort(sort_by == 'State' ? state_sort : year_sort))\n}\nvar sort_defaults = _.debounce(sort_defaults_fn, 200);\n\nunsorted_defaults.subscribe(sort_defaults);\nview.sort_by.subscribe(sort_defaults);\nsort_defaults();"
    }
  }
};
