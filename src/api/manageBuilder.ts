import { RuntimeError } from '../errors/ErrorsList/RuntimeError';
import { manageError } from '../errors/manageError';
import { ActionKey } from '../type/builderType';
import { apiBuilder } from './builder';
import { ENV } from './envClass/envClass';
import { testRoutes } from './http/test';
import { apiLoader } from './loader';

export function manageBuilder() {
  const envBuildInstruction = ENV.getVar('BUILD_INSTRUCTION');
  const actionKey: ActionKey | 'none' = envBuildInstruction as
    | ActionKey
    | 'none';

  const action =
    actionsDefined[actionKey] ||
    (() =>
      manageError<RuntimeError>(
        new RuntimeError('BuildInstructions not available'),
      ));

  if (action) {
    action();
  }
}

const actionsDefined: Record<ActionKey | 'none', (() => void) | undefined> = {
  LOADER: () => apiLoader(),
  BUILDER: () => apiBuilder(),
  none: undefined,
};
