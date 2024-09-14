import { MiddlewaresError } from '../errors/ErrorsList/MiddlewaresError';
import { BuilderParams } from '../type/builderType';

export const checkParameters = async (
  parameters: NonNullable<BuilderParams>,
  req: any,
  res: any,
) => {
  let missingParameters: string = 'Missing parameter(s): ';
  for (const parameter of parameters) {
    if (!parameter.mandatory) continue;

    let value: any = undefined;
    if (typeof parameter.getter === 'function') {
      value = await parameter.getter(req, res);
      console.log('soon');
    } else {
      value = req[parameter.getter][parameter.key];
    }
    if (!value) {
      missingParameters += `[${parameter.key}] : missing in : ${parameter.getter}, `;
    }
  }
  if (missingParameters.length !== 22) {
    missingParameters = missingParameters.slice(0, -2);
    throw new MiddlewaresError(missingParameters, 400);
  }
};
