 import {readFileSync} from "fs";

function isAValidField(field: unknown) : field is Builder {
    if (typeof field !== "object" || field === null) { manageError<RuntimeError>("Invalid field:" + String(field)); return false;}

    const { name, path, schema, function: fn, request } = field as Builder;
    const hasRequiredFields = typeof name === 'string' &&
                            typeof path === 'string' &&
                            typeof schema === 'string' &&
                            typeof fn === 'string' &&
                            typeof request === 'string' &&
                            ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(request);

    if (!hasRequiredFields) {
        manageError<RuntimeError>(RuntimeError, "Invalid field:" + String(field));
        return false;
    }

    if ('middlewares' in field && !Array.isArray((field as Builder).middlewares)) {
        manageError<RuntimeError>(RuntimeError, "Invalid field:" + String(field));
        return false;
    }

    if ('dataTransformers' in field && !Array.isArray((field as Builder).dataTransformers)) {
        manageError<RuntimeError>(RuntimeError, "Invalid field:" + String(field));
        return false;
    }

    if ('cachedData' in field && typeof (field as Builder).cachedData !== 'boolean') {
        manageError<RuntimeError>(RuntimeError, "Invalid field:" + String(field));
        return false;
    }

    if ('protected' in field && typeof (field as Builder).protected !== 'boolean') {
        manageError<RuntimeError>(RuntimeError, "Invalid field:" + String(field)); 
        return false;
    }
    return true;
}

export function apiBuilder(path: string) {
    const envPath = ENV.getVar("PATH_INSTRUCTIONS") || manageError<RuntimeError>(RuntimeError, "PATH_INSTRUCTIONS not found");
    const builderField : Array<any> = (JSON.parse(readFileSync(path, { encoding : 'utf-8'})));

    builderField.every(isAValidField) ? schemeDefiner(builderField) : quit("StepBuilding")
}