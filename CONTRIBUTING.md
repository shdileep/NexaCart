# Contributing to NexaCart

Thank you for your interest in contributing to NexaCart! This guide outlines our development workflow, branch conventions, and testing procedures to ensure smooth collaboration.

---

## 📌 Development Workflow

1. **Fork or Clone the Repository**:
   ```bash
   git clone https://github.com/shdileep/NexaCart.git
   cd NexaCart
   ```

2. **Branch Naming Conventions**:
   Use descriptive branch names following the format:
   - `feature/<feature-name>` for new features or capabilities
   - `fix/<bug-description>` for bug fixes and patches
   - `docs/<documentation-topic>` for documentation improvements
   - `ci/<workflow-topic>` for CI/CD pipeline modifications

3. **Install Dependencies**:
   - Frontend:
     ```bash
     npm install
     ```
   - Backend:
     ```bash
     cd server && npm install && cd ..
     ```

4. **Code Quality and Testing**:
   Ensure all checks pass before submitting a pull request:
   - Run linter: `npm run lint`
   - Run production build: `npm run build`
   - Verify server scripts: `node --check server/server.js`

---

## 🔀 Pull Request Process

1. Create a pull request against the `main` branch.
2. Provide a clear title following [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat:`, `fix:`, `docs:`, `ci:`).
3. Include a concise summary of changes and reference any related issues.
4. Verify that the GitHub Actions CI pipeline passes all checks.
5. Once reviewed and approved, PRs are merged into `main`.
