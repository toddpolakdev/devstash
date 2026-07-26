-- DevStash production seed — generated from prisma/seed.ts.
-- Tables/columns are quoted: Prisma emits PascalCase tables and camelCase columns.
-- Every statement is idempotent on primary key, so this is safe to re-run.
-- Wrapped in a transaction: all of it lands, or none of it does.

BEGIN;

-- 0. Refuse to run against the wrong database. A connection string is easy
--    to point at the wrong Neon branch, and these INSERTs would otherwise
--    scatter DevStash rows through an unrelated app's schema.
DO $$
BEGIN
  IF to_regclass('public."ItemType"') IS NULL THEN
    RAISE EXCEPTION 'Refusing to seed: DevStash tables are missing. Run `prisma migrate deploy` first.';
  END IF;
  IF to_regclass('public."Contact"') IS NOT NULL THEN
    RAISE EXCEPTION 'Refusing to seed: found a Contact table, so this is the portfolio database, not DevStash.';
  END IF;
END $$;

-- 1. Demo user (parent of everything below).
INSERT INTO "User" ("id", "email", "name", "passwordHash", "isPro", "emailVerified", "updatedAt") VALUES
  ('user_demo', 'demo@devstash.io', 'Demo User', '$2b$12$B778WRj0EDs3rKweB1mp9u/q2NxYiZHV4avgiI0pDOJpV0JUx5eXq', false, NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- 2. System item types (no owner). Conflict on id, not (userId, name):
--    userId is NULL and Postgres treats NULLs as distinct in a unique index.
INSERT INTO "ItemType" ("id", "name", "icon", "color", "isSystem", "userId") VALUES
  ('type_snippet', 'snippet', 'Code', '#3b82f6', true, NULL),
  ('type_prompt', 'prompt', 'Sparkles', '#8b5cf6', true, NULL),
  ('type_command', 'command', 'Terminal', '#f97316', true, NULL),
  ('type_note', 'note', 'StickyNote', '#fde047', true, NULL),
  ('type_file', 'file', 'File', '#6b7280', true, NULL),
  ('type_image', 'image', 'Image', '#ec4899', true, NULL),
  ('type_link', 'link', 'Link', '#10b981', true, NULL)
ON CONFLICT ("id") DO NOTHING;

-- 3. Collections (defaultTypeId -> ItemType, so it follows step 2).
INSERT INTO "Collection" ("id", "name", "description", "isFavorite", "defaultTypeId", "userId", "updatedAt") VALUES
  ('col_react', 'React Patterns', 'Reusable React patterns and hooks', true, 'type_snippet', 'user_demo', NOW()),
  ('col_ai_workflows', 'AI Workflows', 'AI prompts and workflow automations', true, 'type_prompt', 'user_demo', NOW()),
  ('col_devops', 'DevOps', 'Infrastructure and deployment resources', false, 'type_snippet', 'user_demo', NOW()),
  ('col_terminal', 'Terminal Commands', 'Useful shell commands for everyday development', false, 'type_command', 'user_demo', NOW()),
  ('col_design', 'Design Resources', 'UI/UX resources and references', false, 'type_link', 'user_demo', NOW())
ON CONFLICT ("id") DO NOTHING;

-- 4. Tags (27 distinct, deduped across all items).
--    Conflict on ("userId", "name") — the natural key. Both columns are NOT
--    NULL here, so unlike ItemType there is no NULL-distinctness problem, and
--    this also dedupes against tags the user already happens to own.
INSERT INTO "Tag" ("id", "name", "userId") VALUES
  ('tag_ci_cd', 'ci-cd', 'user_demo'),
  ('tag_cleanup', 'cleanup', 'user_demo'),
  ('tag_code_quality', 'code-quality', 'user_demo'),
  ('tag_components', 'components', 'user_demo'),
  ('tag_context', 'context', 'user_demo'),
  ('tag_css', 'css', 'user_demo'),
  ('tag_deploy', 'deploy', 'user_demo'),
  ('tag_design_system', 'design-system', 'user_demo'),
  ('tag_docker', 'docker', 'user_demo'),
  ('tag_docs', 'docs', 'user_demo'),
  ('tag_generation', 'generation', 'user_demo'),
  ('tag_git', 'git', 'user_demo'),
  ('tag_hooks', 'hooks', 'user_demo'),
  ('tag_icons', 'icons', 'user_demo'),
  ('tag_kubernetes', 'kubernetes', 'user_demo'),
  ('tag_npm', 'npm', 'user_demo'),
  ('tag_patterns', 'patterns', 'user_demo'),
  ('tag_performance', 'performance', 'user_demo'),
  ('tag_ports', 'ports', 'user_demo'),
  ('tag_process', 'process', 'user_demo'),
  ('tag_react', 'react', 'user_demo'),
  ('tag_refactor', 'refactor', 'user_demo'),
  ('tag_review', 'review', 'user_demo'),
  ('tag_tailwind', 'tailwind', 'user_demo'),
  ('tag_typescript', 'typescript', 'user_demo'),
  ('tag_ui', 'ui', 'user_demo'),
  ('tag_utils', 'utils', 'user_demo')
ON CONFLICT ("userId", "name") DO NOTHING;

-- 5. Items (18). Ids are derived from titles so re-runs are stable.
INSERT INTO "Item" ("id", "title", "contentType", "content", "url", "description", "language", "isFavorite", "isPinned", "userId", "itemTypeId", "updatedAt") VALUES
  ('item_usedebounce_hook', 'useDebounce hook', 'text', 'import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}', NULL, 'Debounce any changing value with a configurable delay.', 'typescript', true, true, 'user_demo', 'type_snippet', NOW()),
  ('item_typed_context_provider', 'Typed context provider', 'text', 'import { createContext, useContext, type ReactNode } from "react";

interface ThemeValue {
  theme: "light" | "dark";
  toggle: () => void;
}

const ThemeContext = createContext<ThemeValue | null>(null);

export function ThemeProvider({ value, children }: { value: ThemeValue; children: ReactNode }) {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}', NULL, 'A null-safe React context with a guarded hook.', 'tsx', false, false, 'user_demo', 'type_snippet', NOW()),
  ('item_groupby_utility', 'groupBy utility', 'text', 'export function groupBy<T, K extends PropertyKey>(
  items: T[],
  key: (item: T) => K,
): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const k = key(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}', NULL, 'Group an array into a record keyed by a selector.', 'typescript', false, false, 'user_demo', 'type_snippet', NOW()),
  ('item_senior_code_reviewer', 'Senior code reviewer', 'text', 'You are a staff engineer reviewing a pull request. Focus on correctness, edge cases, security, and readability. For each issue, cite the line, explain the risk, and suggest a concrete fix. Be direct and concise, and call out anything that would block a merge.', NULL, 'System prompt for thorough, actionable code review.', NULL, false, true, 'user_demo', 'type_prompt', NOW()),
  ('item_documentation_generator', 'Documentation generator', 'text', 'Generate clear documentation for the following code. Include a one-line summary, parameters with their types, the return value, any thrown errors, and a short usage example. Match the project''s existing documentation style and keep prose tight.', NULL, 'Turn code into consistent reference docs.', NULL, false, false, 'user_demo', 'type_prompt', NOW()),
  ('item_refactoring_assistant', 'Refactoring assistant', 'text', 'Refactor the following code for readability and maintainability without changing its behavior. Preserve the public API, add types where missing, and explain each change and why it helps. Flag any change that could alter behavior so it can be reviewed separately.', NULL, 'Behavior-preserving refactors with rationale.', NULL, false, false, 'user_demo', 'type_prompt', NOW()),
  ('item_multi_stage_node_js_dockerfile', 'Multi-stage Node.js Dockerfile', 'text', 'FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]', NULL, 'Small production image via multi-stage build.', 'dockerfile', false, false, 'user_demo', 'type_snippet', NOW()),
  ('item_build_push_and_roll_out_a_release', 'Build, push, and roll out a release', 'text', 'docker build -t registry.example.com/devstash:latest . \
  && docker push registry.example.com/devstash:latest \
  && kubectl rollout restart deployment/devstash', NULL, 'One-liner deploy to a container registry + cluster.', 'bash', false, false, 'user_demo', 'type_command', NOW()),
  ('item_docker_documentation', 'Docker documentation', 'url', NULL, 'https://docs.docker.com', 'Official Docker reference and guides.', NULL, false, false, 'user_demo', 'type_link', NOW()),
  ('item_github_actions_documentation', 'GitHub Actions documentation', 'url', NULL, 'https://docs.github.com/en/actions', 'CI/CD workflows on GitHub Actions.', NULL, false, false, 'user_demo', 'type_link', NOW()),
  ('item_undo_last_commit_keep_changes', 'Undo last commit (keep changes)', 'text', 'git reset --soft HEAD~1', NULL, 'Soft-reset the last commit, keeping changes staged.', 'bash', true, false, 'user_demo', 'type_command', NOW()),
  ('item_remove_all_stopped_containers', 'Remove all stopped containers', 'text', 'docker container prune -f', NULL, 'Prune stopped Docker containers.', 'bash', false, false, 'user_demo', 'type_command', NOW()),
  ('item_kill_the_process_on_a_port', 'Kill the process on a port', 'text', 'lsof -ti:3000 | xargs kill -9', NULL, 'Free a port held by a stuck process.', 'bash', false, false, 'user_demo', 'type_command', NOW()),
  ('item_reinstall_node_modules_cleanly', 'Reinstall node modules cleanly', 'text', 'rm -rf node_modules package-lock.json && npm install', NULL, 'Nuke and reinstall dependencies.', 'bash', false, false, 'user_demo', 'type_command', NOW()),
  ('item_tailwind_css_documentation', 'Tailwind CSS documentation', 'url', NULL, 'https://tailwindcss.com/docs', 'Utility-first CSS framework reference.', NULL, true, false, 'user_demo', 'type_link', NOW()),
  ('item_shadcn_ui', 'shadcn/ui', 'url', NULL, 'https://ui.shadcn.com', 'Composable React component library.', NULL, false, false, 'user_demo', 'type_link', NOW()),
  ('item_material_design_3', 'Material Design 3', 'url', NULL, 'https://m3.material.io', 'Google''s design system guidelines.', NULL, false, false, 'user_demo', 'type_link', NOW()),
  ('item_lucide_icons', 'Lucide Icons', 'url', NULL, 'https://lucide.dev/icons', 'Open-source icon set (used across DevStash).', NULL, false, false, 'user_demo', 'type_link', NOW())
ON CONFLICT ("id") DO NOTHING;

-- 6. Item -> Collection links.
INSERT INTO "ItemCollection" ("itemId", "collectionId") VALUES
  ('item_usedebounce_hook', 'col_react'),
  ('item_typed_context_provider', 'col_react'),
  ('item_groupby_utility', 'col_react'),
  ('item_senior_code_reviewer', 'col_ai_workflows'),
  ('item_documentation_generator', 'col_ai_workflows'),
  ('item_refactoring_assistant', 'col_ai_workflows'),
  ('item_multi_stage_node_js_dockerfile', 'col_devops'),
  ('item_build_push_and_roll_out_a_release', 'col_devops'),
  ('item_docker_documentation', 'col_devops'),
  ('item_github_actions_documentation', 'col_devops'),
  ('item_undo_last_commit_keep_changes', 'col_terminal'),
  ('item_remove_all_stopped_containers', 'col_terminal'),
  ('item_kill_the_process_on_a_port', 'col_terminal'),
  ('item_reinstall_node_modules_cleanly', 'col_terminal'),
  ('item_tailwind_css_documentation', 'col_design'),
  ('item_shadcn_ui', 'col_design'),
  ('item_material_design_3', 'col_design'),
  ('item_lucide_icons', 'col_design')
ON CONFLICT ("itemId", "collectionId") DO NOTHING;

-- 7. Item <-> Tag links. "_ItemTags" is Prisma's implicit m2m join table:
--    "A" is the Item side, "B" is the Tag side (alphabetical by model name).
--    Tag ids are looked up by name rather than hardcoded, so this still points
--    at the right rows if step 4 deduped onto a pre-existing tag.
INSERT INTO "_ItemTags" ("A", "B")
SELECT v.item_id, t."id"
  FROM (VALUES
    ('item_usedebounce_hook', 'react'),
    ('item_usedebounce_hook', 'hooks'),
    ('item_usedebounce_hook', 'performance'),
    ('item_typed_context_provider', 'react'),
    ('item_typed_context_provider', 'context'),
    ('item_typed_context_provider', 'patterns'),
    ('item_groupby_utility', 'typescript'),
    ('item_groupby_utility', 'utils'),
    ('item_senior_code_reviewer', 'review'),
    ('item_senior_code_reviewer', 'code-quality'),
    ('item_documentation_generator', 'docs'),
    ('item_documentation_generator', 'generation'),
    ('item_refactoring_assistant', 'refactor'),
    ('item_refactoring_assistant', 'cleanup'),
    ('item_multi_stage_node_js_dockerfile', 'docker'),
    ('item_multi_stage_node_js_dockerfile', 'ci-cd'),
    ('item_build_push_and_roll_out_a_release', 'deploy'),
    ('item_build_push_and_roll_out_a_release', 'docker'),
    ('item_build_push_and_roll_out_a_release', 'kubernetes'),
    ('item_docker_documentation', 'docker'),
    ('item_docker_documentation', 'docs'),
    ('item_github_actions_documentation', 'ci-cd'),
    ('item_github_actions_documentation', 'docs'),
    ('item_undo_last_commit_keep_changes', 'git'),
    ('item_remove_all_stopped_containers', 'docker'),
    ('item_kill_the_process_on_a_port', 'process'),
    ('item_kill_the_process_on_a_port', 'ports'),
    ('item_reinstall_node_modules_cleanly', 'npm'),
    ('item_tailwind_css_documentation', 'css'),
    ('item_tailwind_css_documentation', 'tailwind'),
    ('item_shadcn_ui', 'components'),
    ('item_shadcn_ui', 'ui'),
    ('item_material_design_3', 'design-system'),
    ('item_lucide_icons', 'icons')
  ) AS v(item_id, tag_name)
  JOIN "Tag" t ON t."name" = v.tag_name AND t."userId" = 'user_demo'
ON CONFLICT ("A", "B") DO NOTHING;

COMMIT;

