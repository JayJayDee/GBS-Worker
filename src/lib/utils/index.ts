
export const wrapError =
  async <T>(
    func: () => Promise<T>
  ): Promise<T | null> => {
    try {
      return await func();
    } catch (err) {
      return null;
    }
  };