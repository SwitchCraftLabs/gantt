import { dateStrToObj } from "./chartHeadings";
import type { Month } from "./chartHeadings";

type ColPos = {
  colStart: number;
  colEnd: number;
};

function getChartBounds(months: Month[]): { dateStart: Date; dateEnd: Date } {
  const lastIdx = months.length - 1;
  return {
    dateStart: new Date(`${months[0].month} 01 ${months[0].year}`),
    dateEnd: new Date(`${months[lastIdx].month} 01 ${months[lastIdx].year}`),
  };
}

export function mapProjectColumns(projects: Project[], months: Month[]): Project[] {
  return projects
    .map((p) => ({ ...p, ...getProjectGridCols(p, months) }))
    .filter((p) => p.colStart && p.colEnd);
}

export function getProjectGridCols(p: Project, months: Month[]): ColPos | undefined {
  const chartBounds = getChartBounds(months),
    chartStart = new Date(chartBounds.dateStart).getTime(),
    chartEnd = new Date(chartBounds.dateEnd).getTime();

  const pStart = new Date(p.start).getTime(),
    pEnd = new Date(p.end).getTime();

  const isStartOutsideLeft = pStart < chartStart,
    isStartOutsideRight = pStart > chartEnd,
    isEndOutsideLeft = pEnd < chartStart,
    isEndOutsideRight = pEnd > chartEnd;

  // Out of bounds || updside down
  if (isStartOutsideRight || isEndOutsideLeft || pStart > pEnd) return;

  let colStart: number | undefined;
  if (isStartOutsideLeft) {
    colStart = 1;
  } else {
    const month = dateStrToObj(p.start);
    const idx = months.findIndex(
      (m) => m.month === month.month && m.quarter === month.quarter && m.year === month.year
    );

    if (idx > -1) {
      colStart = idx + 1;
    } else {
      console.error(`No startCol found - ${p.title}`);
    }
  }

  let colEnd: number | undefined = undefined;
  if (isEndOutsideRight) {
    colEnd = months.length + 1;
  } else {
    const month = dateStrToObj(p.end);
    const idx = months.findIndex(
      (m) => m.month === month.month && m.quarter === month.quarter && m.year === month.year
    );

    if (idx > -1) {
      colEnd = idx + 2;
    } else {
      console.error(`No endCol found - ${p.title}`);
    }
  }

  if (colStart !== undefined && colEnd !== undefined) return { colStart, colEnd };

  return undefined;
}

export type Person = {
  firstName: string;
  lastName: string;
  color: string;
};

export type Project = {
  title: string;
  description: string;
  techLead: Person;
  designer: Person;
  start: string; // mm/dd/yyyy
  end: string; // mm/dd/yyyy
  hasHardDeadline: boolean;
  colStart?: number;
  colEnd?: number;
};

const Bob: Person = {
  firstName: "Bob",
  lastName: "Swagger",
  color: "#6421b8",
};
const Alice: Person = {
  firstName: "Alice",
  lastName: "Green",
  color: "#ed531a",
};
const Chad: Person = {
  firstName: "Chad",
  lastName: "Altomere",
  color: "#008dd2",
};
const Amiee: Person = {
  firstName: "Amiee",
  lastName: "Noire",
  color: "#0d653b",
};

export const projects: Project[] = [
  {
    title: "Develop new design system",
    description: "Here is a description of this project",
    techLead: Bob,
    designer: Bob,
    start: "09/01/2026", // mm/dd/yyyy
    end: "3/01/2027", // mm/dd/yyyy
    hasHardDeadline: true,
  },
  {
    title: "Implement design system code libraries",
    description: "Here is a description of this project",
    techLead: Alice,
    designer: Bob,
    start: "10/01/2026", // mm/dd/yyyy
    end: "5/01/2027", // mm/dd/yyyy
    hasHardDeadline: true,
  },
  {
    title: "Integrate system libraries with application",
    description: "Here is a description of this project",
    techLead: Chad,
    designer: Bob,
    start: "2/01/2027", // mm/dd/yyyy
    end: "7/01/2027", // mm/dd/yyyy
    hasHardDeadline: true,
  },
  {
    title: "Lib testing framework",
    description: "Here is a description of this project",
    techLead: Chad,
    designer: Bob,
    start: "11/01/2026", // mm/dd/yyyy
    end: "3/01/2027", // mm/dd/yyyy
    hasHardDeadline: true,
  },
  {
    title: "Build marketing site",
    description: "Here is a description of this project",
    techLead: Amiee,
    designer: Bob,
    start: "08/01/2026", // mm/dd/yyyy
    end: "11/01/2026", // mm/dd/yyyy
    hasHardDeadline: true,
  },
  {
    title: "Integrate vendor libs",
    description: "Here is a description of this project",
    techLead: Alice,
    designer: Bob,
    start: "1/01/2027", // mm/dd/yyyy
    end: "5/01/2027", // mm/dd/yyyy
    hasHardDeadline: true,
  },
  {
    title: "Incorporate beta feedback",
    description: "Here is a description of this project",
    techLead: Bob,
    designer: Bob,
    start: "07/01/2027", // mm/dd/yyyy
    end: "12/01/2027", // mm/dd/yyyy
    hasHardDeadline: true,
  },
  {
    title: "Public application launch",
    description: "Here is a description of this project",
    techLead: Amiee,
    designer: Bob,
    start: "04/01/2027", // mm/dd/yyyy
    end: "8/01/2027", // mm/dd/yyyy
    hasHardDeadline: true,
  },
  {
    title: "Address low-impact issues, tech debt",
    description: "Here is a description of this project",
    techLead: Chad,
    designer: Bob,
    start: "8/01/2027", // mm/dd/yyyy
    end: "3/01/2028", // mm/dd/yyyy
    hasHardDeadline: true,
  },
];
