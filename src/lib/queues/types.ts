
type ConsumerFunction = (payload: any) => Promise<void>;

export type Subscribe =
  ({ topicId, consumer }: {
    topicId: string,
    consumer: ConsumerFunction
  }) => Promise<void>;

export type Publish =
  ({ topicId, payload }: {
    topicId: string,
    payload: {[key: string]: any}
  }) => Promise<void>;
