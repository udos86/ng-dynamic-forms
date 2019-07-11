import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

const PROJECTS_PATH = "./projects/ng-dynamic-forms";

const PROJECT_PATHS = [
    `${PROJECTS_PATH}/core`,
    `${PROJECTS_PATH}/ui-basic`,
    `${PROJECTS_PATH}/ui-bootstrap`,
    `${PROJECTS_PATH}/ui-foundation`,
    `${PROJECTS_PATH}/ui-ionic`,
    `${PROJECTS_PATH}/ui-kendo`,
    `${PROJECTS_PATH}/ui-material`,
    `${PROJECTS_PATH}/ui-ng-bootstrap`,
    `${PROJECTS_PATH}/ui-primeng`,
    `./schematics`,
    `.`
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
                console.log(`New Version is ${newVersion}`);

                PROJECT_PATHS.forEach(path => setVersion(tree, newVersion, path));
            }
        }
    ]);
}

function setVersion(tree: Tree, version: string, projectPath: string) {

    const path = `${projectPath}/package.json`;

    if (tree.exists(path)) {

        const file = tree.read(path);

        if (file !== null) {

            const json = JSON.parse(file.toString("utf-8"));

            json["version"] = version;

            if (json["peerDependencies"] && json["peerDependencies"]["@ng-dynamic-forms/core"] !== undefined) {
                json["peerDependencies"]["@ng-dynamic-forms/core"] = `^${version}`;
            }

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
