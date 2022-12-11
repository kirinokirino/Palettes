#!/usr/bin/env -S deno run --no-check --allow-read --allow-write --allow-net=lospec.com
import { delay } from "./deps.ts";
import { printJson } from "./printJson.ts";
const url = "https://lospec.com/palette-list/";

export async function fetchPalette(
  name: string,
): Promise<Response> {
  const query = `${url}${name}.json`;
  await delay(100);
  return await fetch(query);
}

export async function getJson(
  promise: Promise<Response>,
): Promise<unknown> {
  try {
    return await promise.then((response) => {
      return response.json();
    }).then(async (jsonData) => {
      return await jsonData;
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Not a JSON response!");
      return {
        data: [],
      };
    }
  }
}

const replaceSpecialChars = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[\'•\.,&]/g, "") // Remove accents
    .replace(/([^\w]+|\s+)/g, "-") // Replace space and other characters by hyphen
    .replace(/\-\-+/g, "-") // Replaces multiple hyphens by one hyphen
    .replace(/(^-+|-+$)/g, ""); // Remove extra hyphens from beginning or end of the string
};

function printProgressBar(maxLen: number, procent: number) {
  let bar = "[";
  for (let i = 1; i <= maxLen; i++) {
    if (i / maxLen < procent) bar += "#";
    else bar += "_";
  }
  bar += "]";
  return bar;
}

const paletteBitnesses = Deno.args;
for (const bitness of paletteBitnesses) {
  const path = `./${bitness}.json`;
  console.log(`Reading ${path}...`);
  const contents = await Deno.readTextFile(path);
  let json = JSON.parse(contents);
  json = JSON.parse(json);
  let i = 0;
  for (const paletteName of json) {
    i += 1;
    const slug = replaceSpecialChars(paletteName).toLowerCase();
    console.log(
      paletteName.padEnd(30),
      "\t",
      printProgressBar(20, i / json.length),
      slug,
    );
    const paletteJson = await getJson(fetchPalette(slug));
    if (paletteJson.error) {
      console.error(paletteJson.error + "! - " + slug);
    } else {
      try {
        await Deno.writeTextFile(
          `./${bitness}/${paletteName}.json`,
          JSON.stringify(paletteJson),
        );
      } catch (e) {
        console.error(e);
      }
    }
  }
}
