export function tsvToJSON(tsv: string) {
  const lines = tsv.split("\n");
  const result = [];
  const headers = lines[0].split("\t");

  for (let i = 1; i < lines.length; i++) {
    const obj: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [k: string]: any;
    } = {};

    const currentline = lines[i].split("\t");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
}
