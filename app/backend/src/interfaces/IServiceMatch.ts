import IMatchOutput from './IMatchOutput';

interface IServiceMatch {
  readAll(): Promise<IMatchOutput[]>;
}

export default IServiceMatch;
