# Vue3 JSTree Component

Under 20kB unpacked size! No hard-coded states.

## Usage

`npm i vue3-jstree-component`  
`<RootTree :treedata="myData" />`

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
