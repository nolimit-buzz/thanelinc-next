import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // components/v5/** is a VERBATIM port of registration-marks-v5.html (W-026).
    // Fidelity is the point — the first port failed by "improving" things.
    //
    //   no-unescaped-entities: escaping apostrophes would edit ported copy, and
    //     the rendered output is identical either way.
    //   no-img-element: swapping <img> for next/image changes layout and sizing
    //     behaviour. A deliberate later optimisation, not part of an exact port.
    //
    // Do NOT widen this override beyond this directory.
    files: ["components/v5/**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
