# CodeGen Script

This script generates : 
- Mongoose schema and the according interface
- GraphQL queries (get, getAll, create, update, delete) and mutations (including mongoose refs objects)
- Client component including a Create Form and a Table with the corresponding objects.

## Commands

```
node codegen.js -n <Object>
```
Creates an *Object* directory.  
You get the **schema.js** server file and the **component.js** client file.
***
```
node codegen.js -d <Object>
```
Deploys the *Object* on the server and client.
***
```
node codegen.js -r
```
Removes all the generated directories.

### **schema.js**

### **component.js**

## TO-DO

- Array of nested refs