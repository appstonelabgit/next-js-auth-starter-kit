import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import reactGoogleTranslate from 'eslint-plugin-react-google-translate'

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    {
        plugins: {
            'react-google-translate': reactGoogleTranslate,
        },
        rules: {
            'react-google-translate/no-conditional-text-nodes-with-siblings':
                'error',
            'react-google-translate/no-return-text-nodes': 'error',
        },
    },
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
    ]),
])

export default eslintConfig
