import IMatchOutput from './IMatchOutput';

interface IServiceMatch {
  readAll(): Promise<IMatchOutput[]>;
  readInProgress(progress: string): Promise<IMatchOutput[]>;
  uploadInProgress(id: number): Promise<string>;
}

export default IServiceMatch;
