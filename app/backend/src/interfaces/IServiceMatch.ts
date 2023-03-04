import IMatchOutput from './IMatchOutput';
import IMatchInProgress from './IMatchInProgress';
import IMatch from './IMatch';

interface IServiceMatch {
  readAll(): Promise<IMatchOutput[]>;
  readInProgress(progress: string): Promise<IMatchOutput[]>;
  uploadInProgress(id: number): Promise<string>;
  uploadInProgressData(matchInProgress: IMatchInProgress): Promise<IMatchInProgress>;
  insertMatch(match: IMatch): Promise<IMatch>;
}

export default IServiceMatch;
