
export const configMandatory =
  <T> ({ source, key }: {
    source: {[key: string]: any},
    key: string
  }): T => {
    if (source[key] === undefined) {
      throw new Error(`Configuration ${key} required`);
    }
    return source[key];
  };

export const configOptional =
  <T> ({ source, key, defaultValue }: {
    source: {[key: string]: any},
    key: string,
    defaultValue?: any
  }): T | null => {
    if (source[key] === undefined && defaultValue === undefined) {
      throw new Error(`Configuration ${key} required`);
    } else if (source[key] === undefined) {
      return defaultValue;
    }
    return source[key];
  };
