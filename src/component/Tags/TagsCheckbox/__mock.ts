/* export const tagsData = [
  { _id: "123wsdf347423", title: "на улице", name: "street" },
  { _id: "123wsdf343423", title: "улыбка", name: "smile" },
  { _id: "123wsdd343423", title: "дача", name: "dacha" },
  { _id: "123wsdfj43423", title: "на природе", name: "nature" },
  { _id: "123wsdf34df23", title: "дома", name: "home" },
  { _id: "12wwsdf343423", title: "с петами", name: "pets" },
]; */

/* export const tagsData = new Map([
  ["123wsdf347423", { title: "на улице", name: "street" }],
  ["123wsdf343423", { title: "улыбка", name: "smile" }],
  ["123wsdd343423", { title: "дача", name: "dacha" }],
  ["123wsdfj43423", { title: "на природе", name: "nature" }],
  ["123wsdf34df23", { title: "дома", name: "home" }],
  ["12wwsdf343423", { title: "с петами", name: "pets" }],
]); */

export const tagsData: TTagsData = new Map([
  [
    "bCcRcxADj2xP9fkSXNpH",
    { title: "зюганов", name: "zuganov", type: "feeling" },
  ],
  [
    "vekwWqVY1yYRd3XeERmd",
    { name: "pets", title: "с животными", type: "withWho" },
  ],
  [
    "vekwWqVY1yYRd3XeER12",
    { name: "parents", title: "с родителями", type: "withWho" },
  ],
  [
    "vekwWqVY1222d3XeERmd",
    { name: "grandmother", title: "с бабушкой", type: "withWho" },
  ],
  ["vekwWqVY1222eeXeERmd", { name: "man", title: "с дядей", type: "withWho" }],
  [
    "rNNyXhgNJUjsbGFzVGAL",
    { title: "на улице", name: "street", type: "where" },
  ],
  ["WX6CY5kGx4FXvdZR6g8E", { name: "smile", title: "улыбка", type: "feeling" }],
  [
    "ieYx4ke8ms0DJb5APv4u",
    { title: "задумчиво", name: "thoughtfully", type: "feeling" },
  ],
  ["ybrq9aFZlTk71akoH7Lz", { title: "дома", name: "home", type: "where" }],
  [
    "fYZ3uqG1vBLFH75Y0rjM",
    { title: "на природе", name: "nature", type: "where" },
  ],
]);

export const state = {
  bCcRcxADj2xP9fkSXNpH: false,
  vekwWqVY1yYRd3XeERmd: false,
  rNNyXhgNJUjsbGFzVGAL: false,
  WX6CY5kGx4FXvdZR6g8E: false,
  ieYx4ke8ms0DJb5APv4u: false,
  ybrq9aFZlTk71akoH7Lz: false,
  fYZ3uqG1vBLFH75Y0rjM: false,
  vekwWqVY1yYRd3XeER12: false,
  vekwWqVY1222d3XeERmd: false,
  vekwWqVY1222eeXeERmd: false,
};

export const defaultTagsIds = [
  "rNNyXhgNJUjsbGFzVGAL",
  "ieYx4ke8ms0DJb5APv4u",
  "fYZ3uqG1vBLFH75Y0rjM",
];
