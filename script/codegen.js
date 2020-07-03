const fs = require("fs");
const readline = require("readline");
const util = require("util");
const { exec } = require("child_process");

function confirm(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(`${query} [Y/n]`, (ans) => {
      rl.close();
      resolve(!(ans.toLowerCase().trim()[0] === "n"));
    })
  );
}

function read_dirs(path) {
  return fs.readdirSync(path).filter((file) => fs.statSync(path + "/" + file).isDirectory());
}

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function error(code, vars) {
  if (code === 1)
    console.error(
      "Run script with a new Entity name. \nUsage:\x1b[1m node codegen.js -n Entity \x1b[0m"
    );
  if (code === 2) console.error("This Entity already exists.");
  if (code === 3) console.error(`Cannot find ${vars} in GraphQL schema.`);
  process.exit();
}

function createObject(object) {
  if (fs.existsSync(object)) error(2);

  fs.mkdirSync(object);
  fs.copyFile("./Template/component.js", `./${object}/component.js`, (err) => {
    if (err) throw err;
  });
  fs.copyFile("./Template/Object/schema.ts", `./${object}/schema.js`, (err) => {
    if (err) throw err;
  });
}

function deployClient(object, client_file) {
  const obj_client = require(`./${object}/component.js`);
  const obj_server = require(`./${object}/schema.js`);

  fs.readFile(`./Template/Object.tsx`, "utf8", function (err, data) {
    if (err) return console.log(err);

    // Client component file
    let client_result = data.replace("$OBJECT", "`" + obj_client.query + "`");
    let new_columns = [];
    obj_client.columns.forEach((col) => {
      const column = util.inspect(col);
      new_columns.push(
        column.replace(/\[Function: .*/g, (str, pos) => {
          const function_name = column.substr(pos + 11, column.indexOf(",", pos) - pos - 12);
          function_string = col[function_name].toString();
          let pos_comma = function_string.indexOf(",");
          while (pos_comma < function_string.indexOf("=>") && pos_comma !== -1) {
            function_string = [
              function_string.slice(0, pos_comma),
              ": any",
              function_string.slice(pos_comma),
            ].join("");
            pos_comma = function_string.indexOf(",", pos_comma + 6);
          }
          pos_comma = function_string.indexOf(")", pos_comma);
          function_string = [
            function_string.slice(0, pos_comma),
            ": any",
            function_string.slice(pos_comma),
          ].join("");
          return function_string + ",";
        })
      );
    });
    client_result = client_result.split("Object").join(object);
    client_result = client_result.replace(`${object}s:`, "Objects:");
    client_result = client_result.split(`${object}:`).join("Object:");
    client_result = client_result.replace("$COLUMNS", new_columns);

    // Retrieve graphql external fields
    let refs = Object.entries(obj_server.definition)
      .map((el) => {
        if (el[1].ref) return [el[0], el[1].ref.toLowerCase()];
      })
      .filter((el) => el);
    // Insert additionnal fields in GraphQL query
    refs.forEach((ref) => {
      const ref_pos = obj_client.query.indexOf(ref[0]);

      if (ref_pos < 0) error(3, ref[0]);

      let ref_fields = obj_client.query
        .slice(obj_client.query.indexOf("{", ref_pos) + 1, obj_client.query.indexOf("}", ref_pos))
        .split("\n")
        .join("\n\t")
        .trim();

      client_result = client_result.replace(
        "$GRAPHQL_ADD_QUERY",
        `${ref[1]}s: all${ref[1].charAt(0).toUpperCase() + ref[1].slice(1)} {
    ${ref_fields}
}
$GRAPHQL_ADD_QUERY`
      );
    });
    client_result = client_result.replace("$GRAPHQL_ADD_QUERY\n", "");

    fs.writeFile(client_file, client_result, "utf8", function (err) {
      deployServerVerif(object);
      if (err) throw err;
    });
  });
}

function deployServer(object, server_dir) {
  if (!fs.existsSync(server_dir)) fs.mkdirSync(server_dir);
  fs.readFile(`./${object}/schema.js`, "utf8", (err, schemaData) => {
    fs.writeFile(
      `${server_dir}/schema.ts`,
      schemaData.replace("module.exports =", "export default"),
      "utf8",
      (err) => {
        if (err) throw err;

        fs.readFile("./Template/Object/ObjectModel.ts", "utf8", (err, data) => {
          const objectSchema = require(`./${object}/schema`);
          const iobject = Object.entries(objectSchema.definition).map((row) => {
            let type = String(row[1].type);
            if (type.includes("ObjectId")) type = `I${row[1].ref}`;
            else if (typeof row[1].type === "function") type = row[1].type.name.toLowerCase();
            return `${row[0]}${row[1].required ? "" : "?"}: ${type};`;
          });
          Object.entries(objectSchema.definition).forEach((row) => {
            if (!row[1].ref) return;
            data = data.replace(
              "$IMPORTS",
              `import { I${row[1].ref} } from "../${row[1].ref}";$IMPORTS`
            );
          });
          data = data.replace("$IMPORTS", "");
          data = data.replace("$IOBJECT", iobject.toString().split(",").join("\n  "));
          data = data.split("Object").join(object);

          fs.writeFile(`${server_dir}/${object}Model.ts`, data, "utf8", (err) => {
            if (err) throw err;

            fs.readFile(`./Template/Object/Object.graphql`, "utf8", (err, data) => {
              if (err) throw err;
              let gqlobject = Object.entries(objectSchema.definition).map((row) => {
                let type = String(row[1].type);
                if (type.includes("ObjectId")) type = "ID";
                else if (typeof row[1].type === "function") type = row[1].type.name;
                if (type === "Number") type = "Int";
                return `${row[0]}: ${type}`;
              });
              data = data.replace(
                "$GRAPHQL_OBJECT_INPUT",
                gqlobject.toString().split(",").join("\n  ")
              );
              gqlobject = Object.entries(objectSchema.definition).map((row) => {
                let type = String(row[1].type);
                if (type.includes("ObjectId")) type = row[1].ref;
                else if (typeof row[1].type === "function") type = row[1].type.name;
                if (type === "Number") type = "Int";
                return `${row[0]}: ${type}${row[1].required ? "!" : ""}`;
              });

              gqlobject = ["_id: ID!", ...gqlobject];
              gqlobject.push("createdAt: Date\n  updatedAt: Date");
              data = data.replace("$GRAPHQL_OBJECT", gqlobject.toString().split(",").join("\n  "));
              data = data.split("Object").join(object);

              fs.writeFile(`${server_dir}/${object}.graphql`, data, "utf8", (err) => {
                if (err) throw err;

                fs.readFile(`./Template/Object/ObjectResolvers.ts`, "utf8", (err, data) => {
                  if (err) throw err;

                  const refs = Object.entries(objectSchema.definition)
                    .map((row) => {
                      if (!row[1].ref) return null;
                      return `${row[0]}: (${object.toLowerCase()}) => {
      return ${row[1].ref}.findById(${object.toLowerCase()}.${row[0]});
    },`;
                    })
                    .filter((el) => el);
                  Object.entries(objectSchema.definition).forEach((row) => {
                    if (!row[1].ref) return;
                    data = data.replace(
                      "$IMPORTS",
                      `import { ${row[1].ref} } from "../${row[1].ref}";$IMPORTS`
                    );
                  });
                  data = data.replace("$IMPORTS", "");
                  data = data.replace("$GRAPHQL_OBJECT_QUERY", refs);
                  data = data.split("Object").join(object);
                  fs.writeFile(`${server_dir}/${object}Resolvers.ts`, data, "utf8", (err) => {
                    if (err) throw err;
                    fs.readFile(`./Template/Object/index.ts`, "utf8", (err, data) => {
                      data = data.split("Object").join(object);
                      fs.writeFile(`${server_dir}/index.ts`, data, "utf8", (err) => {
                        if (err) throw err;
                      });
                    });
                  });
                });
              });
            });
          });
        });
      }
    );
  });
}

function deployClientVerif(object) {
  const client_file = `../client/src/components/${object}.tsx`;
  if (fs.existsSync(client_file)) {
    confirm(
      `${object} component already exists on the \x1b[1mclient\x1b[0m directory. \nOverride ?`
    ).then((answer) => {
      if (!answer) deployServerVerif(object);
      else deployClient(object, client_file);
    });
  } else deployClient(object, client_file);
}

function deployServerVerif(object) {
  const server_dir = `../server/models/${object}`;
  if (fs.existsSync(server_dir)) {
    confirm(
      `${object} model already exists on the \x1b[1mserver\x1b[0m directory. \nOverride ?`
    ).then((answer) => {
      if (!answer) error(0);
      else deployServer(object, server_dir);
    });
  } else deployServer(object, server_dir);
}

// MAIN SCRIPT
const args = process.argv.slice(2);
const object = args[1];
if (args[0] === "-n" && object && object.toLowerCase() !== "template") {
  createObject(object);
} else if (args[0] === "-r") {
  confirm("Delete all entities ?\n").then((answer) => {
    if (!answer) error(0);
    else {
      const dirs = read_dirs("./");
      dirs.splice(dirs.indexOf("Template"), 1);
      for (const dir in dirs) {
        deleteFolderRecursive(dirs[dir]);
      }
    }
  });
} else if (args[0] === "-d") {
  deployClientVerif(object);
} else {
  error(1);
}
