const fs = require("fs");
const path = require("path");
const tailwindNode = require("@tailwindcss/node");
const tailwindOxide = require("@tailwindcss/oxide");

async function buildCss() {
  const root = process.cwd();
  const inputPath = path.resolve(root, "src/app/globals.css");
  const outputPath = path.resolve(root, "src/styles/tailwind-compiled.css");

  const css = fs.readFileSync(inputPath, "utf8");

  // Compile Tailwind CSS v4 design system
  const compiler = await tailwindNode.compile(css, {
    from: inputPath,
    base: path.dirname(inputPath),
    shouldRewriteUrls: true,
    onDependency: () => {},
    polyfills: tailwindNode.Polyfills.All,
  });

  // Scan all source files for class candidates
  const scanner = new tailwindOxide.Scanner({
    sources: [
      { base: root, pattern: "src/**/*.{js,ts,jsx,tsx,md,mdx}", negated: false },
    ],
  });

  const candidates = scanner.scan();
  const builtCss = compiler.build(candidates);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, builtCss, "utf8");

  console.log(
    `[build-css] Generated ${candidates.length} class candidates -> ${outputPath} (${(builtCss.length / 1024).toFixed(1)} KB)`
  );
}

buildCss().catch((err) => {
  console.error("[build-css] Error compiling CSS:", err);
  process.exit(1);
});
