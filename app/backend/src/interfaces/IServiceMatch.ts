import IMatchOutput from './IMatchOutput';
import IMatchInProgress from './IMatchInProgress';

interface IServiceMatch {
  readAll(): Promise<IMatchOutput[]>;
  readInProgress(progress: string): Promise<IMatchOutput[]>;
  uploadInProgress(id: number): Promise<string>;
  uploadInProgressData(matchInProgress: IMatchInProgress): Promise<IMatchInProgress>;
}

export default IServiceMatch;
