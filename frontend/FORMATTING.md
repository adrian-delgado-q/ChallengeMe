# Code Formatting Setup

This project uses **Prettier** for consistent code formatting and **ESLint** for code quality. Formatting is enforced through GitHub Actions and pre-commit hooks.

## 🚀 Quick Start

### Install Dependencies
```bash
cd frontend
npm install
```

### Format Code
```bash
# Format all files
npm run format

# Check formatting (without changing files)
npm run format:check

# Fix ESLint issues
npm run lint:fix
```

## 📋 Configuration

### Prettier Configuration (`.prettierrc`)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### Key Formatting Rules
- **Single quotes** for strings
- **Semicolons** required
- **100 character** line length
- **2 space** indentation
- **Trailing commas** in ES5 contexts
- **LF line endings** for consistency

## 🔧 VS Code Setup

### Recommended Extensions
Install these VS Code extensions for the best experience:

1. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
2. **ESLint** (`dbaeumer.vscode-eslint`)

### Automatic Formatting
The workspace is configured to:
- ✅ Format on save
- ✅ Format on paste
- ✅ Fix ESLint issues on save
- ✅ Organize imports on save

## ⚙️ Scripts

| Script | Description |
|--------|-------------|
| `npm run format` | Format all source files |
| `npm run format:check` | Check if files are formatted correctly |
| `npm run lint` | Run ESLint checks |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run pre-commit` | Run pre-commit checks (formatting + linting) |

## 🔄 Pre-commit Hooks

**Husky** and **lint-staged** automatically format and lint your code before commits:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

### What happens on commit:
1. 📝 **Prettier** formats changed files
2. 🔍 **ESLint** fixes issues automatically
3. ✅ Files are staged with fixes applied

## 🚦 GitHub Actions

### Formatting Check Workflow (`.github/workflows/formatting.yml`)
Runs on every push and PR:

- ✅ **Build Check** - Ensures TypeScript compiles
- ✅ **Format Check** - Verifies Prettier formatting
- ✅ **Lint Check** - Runs ESLint validation
- 💬 **PR Comments** - Automatically comments on PRs with formatting issues

### CI Workflow (`.github/workflows/ci.yml`)
Comprehensive quality checks:

- 🧪 **Multi-Node Testing** (Node 20, 22)
- 🔒 **Security Audit** 
- 📦 **Build Artifacts**
- 🔍 **Dependency Updates**

## 🛠️ Manual Formatting

### Format Specific Files
```bash
# Format a single file
npx prettier --write src/components/MyComponent.tsx

# Format specific directory
npx prettier --write "src/services/**/*.ts"

# Check specific files
npx prettier --check src/components/MyComponent.tsx
```

### Format Staged Files Only
```bash
npm run format:staged $(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.(ts|tsx|js|jsx|json|css|md)$')
```

## 🚨 Troubleshooting

### Pre-commit Hook Not Working
```bash
# Reinstall husky hooks
rm -rf .husky
npx husky install
chmod +x .husky/pre-commit
```

### Formatting Conflicts
```bash
# Reset to consistent formatting
npm run format
git add .
git commit -m "fix: apply consistent formatting"
```

### GitHub Actions Failed
1. Check the Actions tab in your GitHub repository
2. Look for specific formatting or linting errors
3. Run the same commands locally:
   ```bash
   npm run format:check  # Should match GitHub check
   npm run lint         # Should match GitHub check
   npm run build        # Should match GitHub check
   ```

## 📝 Files to Ignore

The `.prettierignore` file excludes:
- `node_modules/`
- `dist/` and `build/`
- Generated files
- Package lock files
- IDE configurations

## 🎯 Best Practices

### Development Workflow
1. **Write code** normally
2. **Save files** → automatic formatting
3. **Commit changes** → pre-commit hooks run
4. **Push to GitHub** → CI checks run

### Code Review
- ✅ Focus on logic, not formatting
- ✅ Formatting is handled automatically
- ✅ CI ensures consistency across team

### Team Collaboration
- 🤝 **Consistent style** across all contributors
- 🚫 **No more** formatting debates
- ⚡ **Faster reviews** without style discussions
- 🔄 **Automatic fixes** in most cases

---

## 📞 Support

If you encounter formatting issues:

1. **Check this README** first
2. **Run formatting commands** locally
3. **Check GitHub Actions** logs
4. **Ask the team** for help

**Happy coding! 🎉**
