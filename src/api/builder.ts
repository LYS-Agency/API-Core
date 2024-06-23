import { readFileSync } from 'fs';
import { RuntimeError } from '../errors/ErrorsList/RuntimeError';
import { manageError } from '../errors/manageError';
import { quit } from '../errors/quitter';
import { Builder } from '../type/builderType';
import { ENV } from './envClass/envClass';

export function apiBuilder(): void {
  const envPath =
    ENV.getVar('PATH_INSTRUCTIONS') ||
    manageError<RuntimeError>(new RuntimeError('PATH_INSTRUCTIONS not found'));
  const builderField: Array<any> = JSON.parse(
    readFileSync(String(envPath), { encoding: 'utf-8' }),
  );

  // builderField.every(isAValidField)
  //   ? createRoutes(builderField as Array<Builder>)
  //   : quit('StepBuilding');
}

// TODO NEED TO REFACTOR IT

function isAValidField(field: unknown): field is Builder {
  if (typeof field !== 'object' || field === null) {
    manageError<RuntimeError>(
      new RuntimeError('Invalid field:' + String(field)),
    );
    return false;
  }

  const { name, path, schema, function: fn, request } = field as Builder;
  const hasRequiredFields =
    typeof name === 'string' &&
    typeof path === 'string' &&
    typeof schema === 'string' &&
    typeof fn === 'string' &&
    typeof request === 'string' &&
    ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(request);

  if (!hasRequiredFields) {
    manageError<RuntimeError>(
      new RuntimeError('Invalid field:' + String(field)),
    );
    return false;
  }

  if (
    'middlewares' in field &&
    !Array.isArray((field as Builder).middlewares)
  ) {
    manageError<RuntimeError>(
      new RuntimeError('Invalid field:' + String(field)),
    );
    return false;
  }

  if (
    'dataTransformers' in field &&
    !Array.isArray((field as Builder).dataTransformers)
  ) {
    manageError<RuntimeError>(
      new RuntimeError('Invalid field:' + String(field)),
    );
    return false;
  }

  if (
    'cachedData' in field &&
    typeof (field as Builder).cachedData !== 'boolean'
  ) {
    manageError<RuntimeError>(
      new RuntimeError('Invalid field:' + String(field)),
    );
    return false;
  }

  if (
    'protected' in field &&
    typeof (field as Builder).protected !== 'boolean'
  ) {
    manageError<RuntimeError>(
      new RuntimeError('Invalid field:' + String(field)),
    );
    return false;
  }
  return true;
}
