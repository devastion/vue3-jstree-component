# Vue3 JSTree Component

## Demo

![Demo](./demo.gif)

## Usage

Using json file for parsing data

`npm i vue3-jstree-component`  
`import { RootTree } from "vue3-jstree-component"`
`import "../node_modules/vue3-jstree-component/dist/style.css"`
`<RootTree :userData="myData" />`

### Example Fie

```
<script>

import jsonData from "@/data.json";
import { RootTree } from "vue3-jstree-component";
import "../node_modules/vue3-jstree-component/dist/style.css";

export default {
  components: { RootTree },
  data: function () {
    return {
      userData: jsonData,
    };
  },
};
</script>

<template>
  <RootTree :userData="jsonData"></RootTree>
</template>

```

## Data Input Format - json file

```
[
{
  "name": "Root Folder",
  "id": 1,
  "children": [
    {
      "name": "File #1"
    },
    {
      "name": "File #2",
      "children: [
        {
          "name": "Child 1",
          "name": "Child 2"
          }
      ]
    }
]
```

## TO DO

- Refactor allChildrenSelected & singleChildrenSelected functions
- To emit the components instead using props
- Try to ditch off the watchers
- Add styles
