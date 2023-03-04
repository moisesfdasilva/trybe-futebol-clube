import IMatchOutput from './IMatchOutput';

interface IServiceMatch {
  readAll(): Promise<IMatchOutput[]>;
  readInProgress(progress: string): Promise<IMatchOutput[]>;
}

export default IServiceMatch;
