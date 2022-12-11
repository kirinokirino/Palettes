#!/usr/bin/env -S deno run --no-check --allow-read
import { printJson } from "./printJson.ts";

function printProgressBar(maxLen: number, procent: number) {
  let bar = "[";
  for (let i = 1; i <= maxLen; i++) {
    if (i / maxLen < procent) bar += "#";
    else bar += "_";
  }
  bar += "]";
  return bar;
}

const paletteSizes = [
  "bit10",
  "bit11",
  "bit12",
  "bit13",
  "bit14",
  "bit15",
  "bit16",
  "bit20",
  "bit24",
  "bit28",
  "bit2",
  "bit32",
  "bit36",
  "bit3",
  "bit40",
  "bit44",
  "bit48",
  "bit4",
  "bit52",
  "bit56",
  "bit5",
  "bit60",
  "bit64",
  "bit6",
  "bit7",
  "bit8",
  "bit9",
  "moreThan64bit",
];

let palettes = {};
for (const paletteSize of paletteSizes) {
  const path = `./${paletteSize}.json`;
  console.log(`Reading ${path}...`);
  const contents = await Deno.readTextFile(path);
  let json = JSON.parse(contents);
  json = JSON.parse(json);
  let palettesForSize = [];
  for (const paletteName of json) {
    const palettePath = `./${paletteSize}/${paletteName}.json`;
	try {
	    const palette = await Deno.readTextFile(palettePath);
	    palettesForSize.push(JSON.parse(palette));
    } catch(e) {
		console.error(e);
    }
  }
  palettes[paletteSize] = palettesForSize;
}

Deno.writeTextFile("./palettes.json", JSON.stringify(palettes));
