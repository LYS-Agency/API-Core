export class ENV {
  public static getVar(variable: string): string | null {
    return process.env[variable] ?? null;
  }
}
