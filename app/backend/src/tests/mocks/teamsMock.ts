import Team from '../../database/models/TeamModel';

const teamsListMock: Team[] = [
  { id: 1, teamName: "Avaí/Kindermann" },
  { id: 2, teamName: "Bahia" },
  { id: 3, teamName: "Botafogo" },
  { id: 4, teamName: "Corinthians" },
  { id: 5, teamName: "Cruzeiro" },
  { id: 6, teamName: "Ferroviária" },
  { id: 7, teamName: "Flamengo" },
  { id: 8, teamName: "Grêmio" },
  { id: 9, teamName: "Internacional" },
  { id: 10, teamName: "Minas Brasília" },
  { id: 11, teamName: "Napoli-SC" },
  { id: 12, teamName: "Palmeiras" },
  { id: 13, teamName: "Real Brasília" },
  { id: 14, teamName: "Santos" },
  { id: 15, teamName: "São José-SP" },
  { id: 16, teamName: "São Paulo" },
] as Team[];

const teamMock: Team = {
  id: 777, teamName: "Vasco da Gama"
} as Team;

export {
  teamsListMock,
  teamMock,
};
