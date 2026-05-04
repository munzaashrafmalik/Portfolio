# Skill Creator

Helps create new Claude skills by guiding through a structured process.

## Trigger Phrases

- "create a new skill"
- "make a skill"
- "add a skill"
- "new skill"
- "skill creator"

## Process

When triggered, guide the user through these steps:

### 1. Ask What the Skill Does

```
What should this skill do? Describe its purpose and functionality.
```

### 2. Ask for Trigger Phrases

```
What phrases should trigger this skill? List 3-5 natural phrases users might say.
```

### 3. Ask for Additional Context (Optional)

```
Any specific instructions, examples, or constraints for this skill? (optional)
```

### 4. Generate the SKILL.md

Create a complete `SKILL.md` file in `.claude/skills/{skill-name}/` with:

```markdown
# {Skill Name}

{Description of what the skill does}

## Trigger Phrases

- {phrase 1}
- {phrase 2}
- {phrase 3}

## Instructions

{Step-by-step instructions for the skill}

## Examples

{Example interactions if applicable}

## Notes

{Any additional context or constraints}
```

## Output

After generating, provide:
1. The complete `SKILL.md` content
2. The file path where it should be saved
3. Offer to create the file

## Skill Naming

Convert the skill description to a lowercase, hyphenated folder name:
- "PDF Reader" → `pdf-reader`
- "Code Reviewer" → `code-reviewer`
- "API Tester" → `api-tester`
