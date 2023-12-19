export interface ISaveLogsService {
  parseAndSaveFromCsv(data: string): Promise<void>;
}
