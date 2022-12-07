let bitN = [];
for (p of document.querySelectorAll("Article h1 a")) {
  bitN.push(p.textContent)
} 
JSON.stringify(bitN)
