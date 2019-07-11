import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

const PROJECTS = [
    "core",
    "ui-basic",
    "ui-bootstrap",
    "ui-foundation",
    "ui-ionic",
    "ui-kendo",
    "ui-material",
    "ui-ng-bootstrap",
    "ui-primeng"
]

enum Increment {

    Major = "Major",
    Minor = "Minor",
    Patch = "Patch"
}

export default function (options: any): Rule {

    const { increment } = options;

    return chain([

        (tree: Tree, _context: SchematicContext) => {

            const currentVersion = getCurrentVersion(tree);

            if (currentVersion !== null) {

                const newVersion = getNewVersion(currentVersion, increment);
                console.log(newVersion);

                PROJECTS.forEach(projectName => {

                    const path = `./projects/ng-dynamic-forms/${projectName}/package.json`;

                    setVersion(tree, newVersion, path);
                });
            }
        }
    ]);
}


function setVersion(tree: Tree, version: string, path: string) {

    if (tree.exists(path)) {

        const file = tree.read(path);

        if (file !== null) {

            const json = JSON.parse(file.toString("utf-8"));

            json["version"] = version;

            tree.overwrite(path, JSON.stringify(json, null, 2));
        }
    }
}

function getNewVersion(currentVersion: string, increment: Increment): string {

    let [major, minor, patch] = currentVersion.split(".").map(increment => parseInt(increment));

    switch (increment) {

        case Increment.Major:
            major = major + 1;
            minor = 0;
            break;

        case Increment.Minor:
            minor = minor + 1;
            patch = 0;
            break;

        case Increment.Patch:
            patch = patch + 1;
            break;
    }

    return `${major}.${minor}.${patch}`;
}

function getCurrentVersion(tree: Tree): string | null {

    const path = "./package.json";

    if (tree.exists(path)) {

        const file = tree.read(path);

        if (file !== null) {

            const json = JSON.parse(file.toString("utf-8"));

            return json["version"];
        }
    }

    return null;
}
