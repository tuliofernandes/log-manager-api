import { LogService } from "@/services/LogService";
import { LogRepository } from "@/repositories/LogRepository";

jest.mock("@/repositories/LogRepository");

describe("[Service] LogService", () => {
  let logService: LogService;
  let logRepository: LogRepository;

  beforeEach(() => {
    logRepository = new LogRepository();
    logService = new LogService(logRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("parseLogs", () => {
    it("should parse logs correctly", async () => {
      const data = `109.76.175.111;27-Feb-2022;22:29:32.000;Sonsing;8.8;174766704-8;De-engineered optimizing forecast;in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non
      178.8.106.32;22-Jan-2023;3:44:53.000;Sonair;6.1.8;596167229-8;De-engineered intangible knowledge base;metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra
      240.246.127.13;30-Mar-2022;16:34:08.000;Asoka;0.50;640612225-9;Diverse foreground challenge;nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor`;

      const expectedLogs = [
        {
          logId: "174766704-8",
          ip: "109.76.175.111",
          datetime: new Date("2022-02-28T01:29:32.000Z"),
          type: "Sonsing",
          version: "8.8",
          title: "De-engineered optimizing forecast",
          description:
            "in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non",
        },
        {
          logId: "596167229-8",
          ip: "178.8.106.32",
          datetime: new Date("2023-01-22T06:44:53.000Z"),
          type: "Sonair",
          version: "6.1.8",
          title: "De-engineered intangible knowledge base",
          description:
            "metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra",
        },
        {
          logId: "640612225-9",
          ip: "240.246.127.13",
          datetime: new Date("2022-03-30T19:34:08.000Z"),
          type: "Asoka",
          version: "0.50",
          title: "Diverse foreground challenge",
          description:
            "nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor",
        },
      ];
      const result = await logService.parseLogs(data);

      expect(result).toEqual(expectedLogs);
    });

    it("should skip empty lines", async () => {
      const data = `109.76.175.111;27-Feb-2022;22:29:32.000;Sonsing;8.8;174766704-8;De-engineered optimizing forecast;in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non
      178.8.106.32;22-Jan-2023;3:44:53.000;Sonair;6.1.8;596167229-8;De-engineered intangible knowledge base;metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra

      240.246.127.13;30-Mar-2022;16:34:08.000;Asoka;0.50;640612225-9;Diverse foreground challenge;nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor`;

      const expectedLogs = [
        {
          logId: "174766704-8",
          ip: "109.76.175.111",
          datetime: new Date("2022-02-28T01:29:32.000Z"),
          type: "Sonsing",
          version: "8.8",
          title: "De-engineered optimizing forecast",
          description:
            "in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non",
        },
        {
          logId: "596167229-8",
          ip: "178.8.106.32",
          datetime: new Date("2023-01-22T06:44:53.000Z"),
          type: "Sonair",
          version: "6.1.8",
          title: "De-engineered intangible knowledge base",
          description:
            "metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra",
        },
        {
          logId: "640612225-9",
          ip: "240.246.127.13",
          datetime: new Date("2022-03-30T19:34:08.000Z"),
          type: "Asoka",
          version: "0.50",
          title: "Diverse foreground challenge",
          description:
            "nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor",
        },
      ];

      const result = await logService.parseLogs(data);

      expect(result).toEqual(expectedLogs);
    });
  });

  describe("saveLogs", () => {
    it("should call log repository createMany method with correct values", async () => {
      const logs = [
        {
          logId: "174766704-8",
          ip: "109.76.175.111",
          datetime: new Date("2022-02-28T01:29:32.000Z"),
          type: "Sonsing",
          version: "8.8",
          title: "De-engineered optimizing forecast",
          description:
            "in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non",
        },
        {
          logId: "596167229-8",
          ip: "178.8.106.32",
          datetime: new Date("2023-01-22T06:44:53.000Z"),
          type: "Sonair",
          version: "6.1.8",
          title: "De-engineered intangible knowledge base",
          description:
            "metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra",
        },
      ];

      const createManySpy = jest.spyOn(logRepository, "createMany");

      await logService.saveLogs(logs);

      expect(createManySpy).toHaveBeenCalledWith(logs);
    });
  });

  describe("parseAndSaveLogs", () => {
    it("should call parseLogs correctly", async () => {
      const data = `109.76.175.111;27-Feb-2022;22:29:32.000;Sonsing;8.8;174766704-8;De-engineered optimizing forecast;in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non
      178.8.106.32;22-Jan-2023;3:44:53.000;Sonair;6.1.8;596167229-8;De-engineered intangible knowledge base;metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra
      240.246.127.13;30-Mar-2022;16:34:08.000;Asoka;0.50;640612225-9;Diverse foreground challenge;nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor`;

      const parseLogsSpy = jest.spyOn(LogService.prototype, "parseLogs");

      await logService.parseAndSaveLogs(data);

      expect(parseLogsSpy).toHaveBeenCalledWith(data);
    });
  });
});
